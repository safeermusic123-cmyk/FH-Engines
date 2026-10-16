import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Support large payload for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize GoogleGenAI SDK with server-side API key and User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper: Official SVG emblem of FH Engine Sharjah UAE as base64 PNG fallback
const FH_ENGINE_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#05070c"/>
    </linearGradient>
    <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <radialGradient id="combustion" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#a31414" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="64" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="230" fill="none" stroke="#1f2937" stroke-width="6"/>
  <circle cx="256" cy="256" r="180" fill="url(#combustion)"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="#a31414" stroke-width="4" stroke-dasharray="16 10"/>
  <g font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="150" text-anchor="middle" dominant-baseline="central">
    <text x="210" y="240" fill="#ffffff">F</text>
    <text x="305" y="240" fill="url(#redGlow)">H</text>
  </g>
  <text x="256" y="340" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="34" fill="#ffffff" letter-spacing="8" text-anchor="middle">FH ENGINE</text>
  <text x="256" y="380" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="18" fill="#ef4444" letter-spacing="6" text-anchor="middle">SHARJAH · UAE</text>
</svg>`;

// API Route: Return default company logo SVG and data URI
app.get('/api/default-logo', (_req: Request, res: Response) => {
  const base64Svg = Buffer.from(FH_ENGINE_LOGO_SVG).toString('base64');
  res.json({
    svg: FH_ENGINE_LOGO_SVG,
    dataUrl: `data:image/svg+xml;base64,${base64Svg}`,
  });
});

// Step 1: Start Veo video generation (POST /api/generate-video)
app.post('/api/generate-video', async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      imageBase64,
      mimeType = 'image/png',
      aspectRatio = '16:9',
      resolution = '720p',
    } = req.body;

    const validatedAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';
    const modelToUse = 'veo-3.1-fast-generate-preview';

    const defaultPrompt =
      'Cinematic high-end 3D loop animation of the company logo emblem, smoothly rotating and levitating with metallic reflections, subtle combustion particle sparks, and glowing red engine heat effects on a dark studio backdrop';

    const finalPrompt = (prompt && prompt.trim().length > 0) ? prompt.trim() : defaultPrompt;

    const config: any = {
      numberOfVideos: 1,
      aspectRatio: validatedAspectRatio,
      resolution: resolution || '720p',
    };

    const payload: any = {
      model: modelToUse,
      prompt: finalPrompt,
      config,
    };

    if (imageBase64) {
      // Clean base64 string
      const cleanBase64 = imageBase64.includes('base64,')
        ? imageBase64.split('base64,')[1]
        : imageBase64;

      payload.image = {
        imageBytes: cleanBase64,
        mimeType: mimeType || 'image/png',
      };
    }

    console.log(`[Veo] Requesting video generation with model: ${modelToUse}, aspect ratio: ${validatedAspectRatio}`);
    const operation = await ai.models.generateVideos(payload);

    if (!operation || !operation.name) {
      throw new Error('Video generation failed to return an operation name');
    }

    console.log(`[Veo] Operation started: ${operation.name}`);
    res.json({
      operationName: operation.name,
      model: modelToUse,
      aspectRatio: validatedAspectRatio,
    });
  } catch (error: any) {
    console.error('[Veo] Error generating video:', error);
    const errorMessage = error?.message || 'Failed to start video generation';
    const isQuotaError =
      errorMessage.includes('quota') ||
      errorMessage.includes('RESOURCE_EXHAUSTED') ||
      error?.status === 429;

    res.status(isQuotaError ? 429 : 500).json({
      error: errorMessage,
      isQuotaError,
      details: error?.details || null,
    });
  }
});

// Step 2: Poll operation status (POST /api/video-status)
app.post('/api/video-status', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: !!updated.done,
      error: updated.error || null,
      metadata: updated.metadata || null,
    });
  } catch (error: any) {
    console.error('[Veo] Error checking video status:', error);
    res.status(500).json({ error: error?.message || 'Failed to check operation status' });
  }
});

// Step 3: Download & stream generated video (POST /api/video-download)
app.post('/api/video-download', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    if (!updated.done) {
      return res.status(400).json({ error: 'Video generation is still processing' });
    }

    if (updated.error) {
      return res.status(500).json({ error: updated.error.message || 'Video generation failed' });
    }

    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({ error: 'Generated video URI not found in operation response' });
    }

    console.log(`[Veo] Streaming video from Google Cloud Storage: ${uri.substring(0, 40)}...`);
    const currentApiKey = process.env.GEMINI_API_KEY || '';
    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': currentApiKey },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({
        error: `Failed to download video stream (HTTP ${videoRes.status})`,
      });
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'inline; filename="fh-engine-veo-loop.mp4"');

    if (videoRes.body) {
      videoRes.body.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          },
          abort(err) {
            console.error('[Veo] Stream aborted:', err);
            res.end();
          },
        })
      );
    } else {
      res.status(500).json({ error: 'Empty video stream received' });
    }
  } catch (error: any) {
    console.error('[Veo] Error downloading video:', error);
    res.status(500).json({ error: error?.message || 'Failed to download video stream' });
  }
});

// Vite integration: Dev middleware or Production static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Server] Vite middleware attached for development');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log('[Server] Serving production build from dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] FH Engine UAE server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
