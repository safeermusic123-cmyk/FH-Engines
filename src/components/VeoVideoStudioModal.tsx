import React, { useState, useRef, useEffect } from 'react';
import {
  Film,
  Upload,
  Sparkles,
  Check,
  RefreshCw,
  Download,
  Play,
  Pause,
  AlertCircle,
  X,
  Layers,
  ArrowRight,
  Maximize2,
  Tv,
  Smartphone,
  Eye,
  Sliders,
} from 'lucide-react';

interface VeoVideoStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyLogoVideo?: (videoUrl: string) => void;
  activeVideoUrl?: string | null;
}

interface PresetOption {
  id: string;
  label: string;
  description: string;
  prompt: string;
  thumbnailSvg?: string;
  imageUrl?: string;
}

export const VeoVideoStudioModal: React.FC<VeoVideoStudioModalProps> = ({
  isOpen,
  onClose,
  onApplyLogoVideo,
  activeVideoUrl,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/png');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState<string>(
    'Seamless high-end 3D loop animation of the FH Engine company logo emblem, rotating in a dark supercar showroom with metallic reflections, glowing fiery red combustion particle sparks, and subtle volumetric exhaust smoke'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(activeVideoUrl || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isQuotaError, setIsQuotaError] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'preview'>('create');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pollIntervalRef = useRef<any>(null);

  // SVG representation of FH Engine logo for instant preset
  const FH_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" rx="40" fill="#090e17"/>
    <circle cx="200" cy="200" r="160" fill="none" stroke="#222" stroke-width="4"/>
    <circle cx="200" cy="200" r="130" fill="none" stroke="#a31414" stroke-width="4" stroke-dasharray="12 8"/>
    <text x="160" y="210" font-family="sans-serif" font-weight="900" font-size="110" fill="#ffffff" text-anchor="middle">F</text>
    <text x="240" y="210" font-family="sans-serif" font-weight="900" font-size="110" fill="#ef4444" text-anchor="middle">H</text>
    <text x="200" y="280" font-family="sans-serif" font-weight="800" font-size="22" fill="#ffffff" letter-spacing="6" text-anchor="middle">FH ENGINE</text>
    <text x="200" y="310" font-family="sans-serif" font-weight="700" font-size="13" fill="#ef4444" letter-spacing="4" text-anchor="middle">SHARJAH · UAE</text>
  </svg>`;

  const presetStylePrompts = [
    {
      id: 'combustion',
      title: 'Combustion & Red Sparks',
      icon: '🔥',
      prompt:
        'Continuous seamless 3D loop animation of the FH Engine logo emblem floating with metallic chrome reflections, energetic fiery combustion sparks drifting past, and pulsing red engine heat rings on deep black background',
    },
    {
      id: 'cyberpunk',
      title: 'Holographic Neon Spin',
      icon: '⚡',
      prompt:
        'Futuristic 3D holographic loop of the logo emblem rotating with glowing crimson laser scan lines, iridescent reflections, and smooth 360-degree continuous turntable motion',
    },
    {
      id: 'luxury-showroom',
      title: 'Luxury Studio Turntable',
      icon: '🏎️',
      prompt:
        'Photorealistic 3D cinematic camera orbit around the metallic automotive logo emblem mounted on carbon fiber pedestal with dramatic overhead studio spotlights, anamorphic lens flares, and seamless infinite loop',
    },
    {
      id: 'wind-tunnel',
      title: 'Aero Wind Tunnel Loop',
      icon: '💨',
      prompt:
        'High-speed aerodynamic wind tunnel simulation around the 3D logo emblem with glowing red supersonic aerodynamic streamlines, subtle air turbulence, and loop-ready motion',
    },
  ];

  // Set default FH Engine logo preset on mount if no image selected
  useEffect(() => {
    if (!selectedImage) {
      const base64 = btoa(FH_LOGO_SVG);
      setSelectedImage(`data:image/svg+xml;base64,${base64}`);
      setImageMimeType('image/svg+xml');
    }
  }, []);

  // Cleanup polling timer on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetLogo = () => {
    const base64 = btoa(FH_LOGO_SVG);
    setSelectedImage(`data:image/svg+xml;base64,${base64}`);
    setImageMimeType('image/svg+xml');
    setErrorMessage(null);
  };

  const handleStartGeneration = async () => {
    if (!selectedImage) {
      setErrorMessage('Please upload a photo or select the FH Engine company logo preset');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setIsQuotaError(false);
    setProgressPercent(10);
    setProgressStep('Initializing Veo 3.1 neural model...');

    try {
      // 1. Convert SVG to PNG if needed for Veo API
      let base64Payload = selectedImage;
      let finalMimeType = imageMimeType;

      if (selectedImage.startsWith('data:image/svg+xml')) {
        // Render SVG to Canvas to get standard PNG base64
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            if (ctx) {
              ctx.drawImage(img, 0, 0, 512, 512);
              base64Payload = canvas.toDataURL('image/png');
              finalMimeType = 'image/png';
            }
            resolve();
          };
          img.onerror = () => reject(new Error('Failed to rasterize logo SVG'));
          img.src = selectedImage;
        });
      }

      setProgressPercent(25);
      setProgressStep('Submitting animation request to Veo (veo-3.1-fast-generate-preview)...');

      // 2. Call backend /api/generate-video
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageBase64: base64Payload,
          mimeType: finalMimeType,
          aspectRatio,
          resolution: '720p',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429 || data.isQuotaError) {
          setIsQuotaError(true);
          throw new Error(
            data.error ||
              'Veo video generation quota reached. Please connect an enabled project or check your Gemini API plan.'
          );
        }
        throw new Error(data.error || 'Failed to start video generation');
      }

      const operationName = data.operationName;
      setProgressPercent(40);
      setProgressStep('Synthesizing 3D camera trajectory and loop physics...');

      // 3. Poll /api/video-status
      let attempts = 0;
      const maxAttempts = 60; // Up to 3.5 minutes

      pollIntervalRef.current = setInterval(async () => {
        attempts++;
        const currentProgress = Math.min(40 + attempts * 2.5, 92);
        setProgressPercent(Math.round(currentProgress));

        if (attempts > 3 && attempts < 8) {
          setProgressStep('Simulating combustion particles and reflections...');
        } else if (attempts >= 8 && attempts < 15) {
          setProgressStep('Encoding seamless loop frames with Veo...');
        } else if (attempts >= 15) {
          setProgressStep('Finalizing high-fidelity MP4 video stream...');
        }

        try {
          const statusRes = await fetch('/api/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName }),
          });

          const statusData = await statusRes.json();

          if (statusData.error) {
            clearInterval(pollIntervalRef.current);
            setIsGenerating(false);
            setErrorMessage(statusData.error.message || 'Video generation failed');
            return;
          }

          if (statusData.done) {
            clearInterval(pollIntervalRef.current);
            setProgressPercent(95);
            setProgressStep('Downloading generated MP4 video...');

            // 4. Download video stream from /api/video-download
            const downloadRes = await fetch('/api/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName }),
            });

            if (!downloadRes.ok) {
              const downloadError = await downloadRes.json().catch(() => ({}));
              throw new Error(downloadError.error || 'Failed to download generated video');
            }

            const videoBlob = await downloadRes.blob();
            const videoObjectUrl = URL.createObjectURL(videoBlob);

            setProgressPercent(100);
            setProgressStep('Complete!');
            setGeneratedVideoUrl(videoObjectUrl);
            setIsGenerating(false);
            setActiveTab('preview');
          }
        } catch (pollErr: any) {
          console.error('Polling error:', pollErr);
          if (attempts >= maxAttempts) {
            clearInterval(pollIntervalRef.current);
            setIsGenerating(false);
            setErrorMessage('Video generation timed out. Please try again.');
          }
        }
      }, 3500);
    } catch (err: any) {
      setIsGenerating(false);
      setErrorMessage(err.message || 'An unexpected error occurred during video generation');
    }
  };

  const handleDownloadVideo = () => {
    if (!generatedVideoUrl) return;
    const a = document.createElement('a');
    a.href = generatedVideoUrl;
    a.download = `fh-engine-veo-loop-${aspectRatio === '16:9' ? 'landscape' : 'portrait'}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleApplyAsLogo = () => {
    if (generatedVideoUrl && onApplyLogoVideo) {
      onApplyLogoVideo(generatedVideoUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl text-white overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/30">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-heading font-black tracking-tight text-white uppercase">
                  Veo Video Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  veo-3.1-fast-generate-preview
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Animate photos & company logo into unique seamless looping videos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {generatedVideoUrl && (
              <div className="flex bg-zinc-800/90 rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeTab === 'create' ? 'bg-red-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Configure
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeTab === 'preview' ? 'bg-red-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Watch Video
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {activeTab === 'preview' && generatedVideoUrl ? (
            /* Video Result Preview Mode */
            <div className="space-y-6">
              <div className="relative mx-auto bg-black rounded-xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center max-w-2xl aspect-[16/9]">
                <video
                  ref={videoRef}
                  src={generatedVideoUrl}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => setActiveTab('create')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold text-zinc-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Generate Another Variation</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadVideo}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold text-white border border-zinc-700 transition-colors"
                  >
                    <Download className="w-4 h-4 text-red-400" />
                    <span>Download MP4</span>
                  </button>

                  {onApplyLogoVideo && (
                    <button
                      onClick={handleApplyAsLogo}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#a31414] hover:bg-red-700 text-sm font-bold text-white shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Set as Header Logo Video</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Studio Configuration Mode */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Image Selection & Aspect Ratio */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    1. Select Photo or Logo
                  </label>

                  {/* Image Preview Box */}
                  <div className="relative group border-2 border-dashed border-zinc-700 hover:border-red-500/70 rounded-xl bg-zinc-900/50 p-4 transition-all flex flex-col items-center justify-center text-center min-h-[220px]">
                    {selectedImage ? (
                      <div className="relative w-full flex flex-col items-center">
                        <div className="relative max-h-40 max-w-[240px] rounded-lg overflow-hidden shadow-md bg-black/60 p-2 border border-zinc-800">
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-contain max-h-36"
                          />
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 rounded-md text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                          >
                            Replace Image
                          </button>
                          <button
                            type="button"
                            onClick={handleSelectPresetLogo}
                            className="px-3 py-1 rounded-md text-xs font-semibold bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 transition-colors"
                          >
                            Reset to FH Logo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer flex flex-col items-center py-6"
                      >
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-red-400 group-hover:scale-110 transition-all mb-3">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-zinc-200">
                          Click to upload any image or logo
                        </span>
                        <span className="text-xs text-zinc-500 mt-1">
                          PNG, JPG, SVG, WebP up to 20MB
                        </span>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Aspect Ratio Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    2. Video Aspect Ratio
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAspectRatio('16:9')}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        aspectRatio === '16:9'
                          ? 'bg-red-950/40 border-red-500 text-white shadow-md shadow-red-950/50'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Tv className={`w-5 h-5 ${aspectRatio === '16:9' ? 'text-red-400' : 'text-zinc-500'}`} />
                      <div>
                        <div className="text-sm font-bold">16:9 Landscape</div>
                        <div className="text-[11px] text-zinc-400">Desktop & Showroom</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAspectRatio('9:16')}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        aspectRatio === '9:16'
                          ? 'bg-red-950/40 border-red-500 text-white shadow-md shadow-red-950/50'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Smartphone
                        className={`w-5 h-5 ${aspectRatio === '9:16' ? 'text-red-400' : 'text-zinc-500'}`}
                      />
                      <div>
                        <div className="text-sm font-bold">9:16 Portrait</div>
                        <div className="text-[11px] text-zinc-400">Mobile & Reels</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Prompt & Presets */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      3. Animation Prompt & Motion Style
                    </label>
                    <span className="text-[11px] text-zinc-500">Optimized for Veo loops</span>
                  </div>

                  {/* Preset Style Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {presetStylePrompts.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setPrompt(style.prompt)}
                        className={`p-2.5 rounded-lg border text-left transition-all text-xs flex items-start gap-2 ${
                          prompt === style.prompt
                            ? 'bg-red-950/40 border-red-500 text-white'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        <span className="text-sm leading-none">{style.icon}</span>
                        <div>
                          <div className="font-bold">{style.title}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Textarea */}
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    placeholder="Describe the 3D movement, lighting, reflections, loop behavior..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-red-500 focus:outline-none text-sm text-zinc-200 placeholder-zinc-500 resize-none transition-colors"
                  />
                </div>

                {/* Status or Error Message */}
                {errorMessage && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
                      isQuotaError
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                        : 'bg-red-950/40 border-red-500/50 text-red-200'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">
                        {isQuotaError ? 'Paid API Key / Quota Required' : 'Generation Note'}
                      </div>
                      <div className="mt-0.5 leading-relaxed">{errorMessage}</div>
                    </div>
                  </div>
                )}

                {/* Progress Bar (when generating) */}
                {isGenerating && (
                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold text-zinc-200">
                        <RefreshCw className="w-3.5 h-3.5 text-red-400 animate-spin" />
                        <span>{progressStep}</span>
                      </div>
                      <span className="font-mono font-bold text-red-400">{progressPercent}%</span>
                    </div>

                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-zinc-500 italic">
                      Veo video generation renders high-definition physics and motion. This typically takes 45–90
                      seconds.
                    </p>
                  </div>
                )}

                {/* Primary Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartGeneration}
                    disabled={isGenerating || !selectedImage}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                      isGenerating || !selectedImage
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#a31414] via-red-600 to-[#881010] hover:from-red-600 hover:to-red-700 text-white shadow-red-900/30 hover:shadow-red-900/50 hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Rendering Video with Veo...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Generate Loop Video with Veo 3.1</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
