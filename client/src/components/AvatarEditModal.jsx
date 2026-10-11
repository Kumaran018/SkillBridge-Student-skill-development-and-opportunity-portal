import React, { useState, useRef } from 'react';
import { Camera, Upload, Link as LinkIcon, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';

const PRESET_AVATARS = [
  {
    id: 'male-tech-1',
    name: 'Full-Stack Dev',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'female-dev-1',
    name: 'Frontend Engineer',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'male-dev-2',
    name: 'Systems Architect',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'female-dev-2',
    name: 'AI Researcher',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'male-dev-3',
    name: 'Cloud Engineer',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'female-dev-3',
    name: 'Data Scientist',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'male-dev-4',
    name: 'DevOps Specialist',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'tech-lead-1',
    name: 'Engineering Lead',
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
  }
];

export default function AvatarEditModal({
  isOpen,
  onClose,
  currentAvatar,
  userName = 'Student',
  onSaveAvatar
}) {
  const [selectedUrl, setSelectedUrl] = useState(currentAvatar || PRESET_AVATARS[0].url);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'upload' | 'url'
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedUrl(reader.result);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read file from disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e) => {
    e.preventDefault();
    if (!customInputUrl.trim()) return;
    setSelectedUrl(customInputUrl.trim());
  };

  const handleConfirmSave = () => {
    if (onSaveAvatar && selectedUrl) {
      onSaveAvatar(selectedUrl);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-[#101726] border border-[#1C2638] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1C2638] flex items-center justify-between bg-[#0B101B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00E699]/10 border border-[#00E699]/30 flex items-center justify-center text-[#00E699]">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Edit Profile Picture</h2>
              <p className="text-[11px] text-slate-400">Choose an avatar preset, upload an image, or use a custom URL.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C2638] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Avatar Preview Section */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#0B101B] border border-[#1C2638]">
            <div className="relative">
              <img
                src={selectedUrl}
                alt="Selected preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#00E699] ring-4 ring-[#00E699]/20 shadow-glow-emerald"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00E699] text-[#070B12] flex items-center justify-center shadow-md">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-[#00E699] tracking-wider font-bold">
                Active Live Preview
              </span>
              <div className="text-xs font-bold text-white">{userName}</div>
              <p className="text-[11px] text-slate-400">This photo will appear on your dashboard, signals, and recruiter profile.</p>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#0B101B] rounded-xl border border-[#1C2638] text-xs">
            <button
              onClick={() => setActiveTab('presets')}
              className={`py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'bg-[#101726] text-[#00E699] border border-[#00E699]/30 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Presets
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-[#101726] text-[#00E699] border border-[#00E699]/30 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'url'
                  ? 'bg-[#101726] text-[#00E699] border border-[#00E699]/30 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              Image URL
            </button>
          </div>

          {/* TAB 1: PRESETS GRID */}
          {activeTab === 'presets' && (
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Select from Curated Tech Avatars
              </label>
              <div className="grid grid-cols-4 gap-3">
                {PRESET_AVATARS.map((item) => {
                  const isSelected = selectedUrl === item.url;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedUrl(item.url)}
                      className={`relative group rounded-xl p-1.5 border transition-all text-center ${
                        isSelected
                          ? 'border-[#00E699] bg-[#00E699]/10 ring-2 ring-[#00E699]/30'
                          : 'border-[#1C2638] bg-[#0B101B] hover:border-slate-500 hover:bg-[#162033]'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover mx-auto"
                      />
                      <span className="block text-[10px] text-slate-300 font-medium truncate mt-1.5">
                        {item.name}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#00E699] text-[#070B12] flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: LOCAL DEVICE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Upload from Your Computer
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#1C2638] hover:border-[#00E699] rounded-xl p-8 text-center cursor-pointer transition-all bg-[#0B101B] hover:bg-[#00E699]/5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#101726] border border-[#1C2638] flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#00E699] group-hover:border-[#00E699]/40 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="mt-3 text-xs font-bold text-white group-hover:text-[#00E699] transition-colors">
                  Click to Browse Image File
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Supports PNG, JPG, GIF or WEBP up to 5MB</p>
              </div>
              {uploadError && (
                <p className="text-xs text-[#EF4444] font-medium">{uploadError}</p>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM IMAGE URL */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                External Image Web Address
              </label>
              <form onSubmit={handleApplyCustomUrl} className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  value={customInputUrl}
                  onChange={(e) => setCustomInputUrl(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white text-xs placeholder-slate-500 focus:outline-hidden focus:border-[#00E699]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-[#101726] hover:bg-[#162033] border border-[#1C2638] text-xs font-semibold text-[#00E699] hover:border-[#00E699] transition-colors shrink-0"
                >
                  Preview
                </button>
              </form>
              <p className="text-[11px] text-slate-500">Paste any public direct image URL to apply it to your profile.</p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1C2638] bg-[#0B101B] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#101726] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmSave}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-glow-emerald transition-all"
          >
            Save Profile Picture
          </button>
        </div>

      </div>
    </div>
  );
}
