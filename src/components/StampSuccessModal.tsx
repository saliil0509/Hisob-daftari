import React, { useEffect } from 'react';
import { Award, CheckCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface StampSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  score: number;
  onNextLesson?: () => void;
}

export const StampSuccessModal: React.FC<StampSuccessModalProps> = ({
  isOpen,
  onClose,
  lessonTitle,
  score,
  onNextLesson
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEffects.playStamp();
      const timer = setTimeout(() => {
        soundEffects.playSuccess();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#111a2e] to-[#0a0f1d] text-white shadow-2xl border-2 border-amber-400/40 animate-in zoom-in-95 duration-300"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px rgba(251, 191, 36, 0.2)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modern Stamp Graphic */}
        <div className="flex justify-center my-2">
          <div className="border-4 border-double border-amber-400 text-amber-400 bg-amber-400/10 rounded-full w-36 h-36 flex flex-col items-center justify-center p-2 text-center select-none shadow-lg shadow-amber-500/20 rotate-[-6deg]">
            <span className="font-mono-code text-[9px] tracking-widest uppercase font-bold text-amber-300">
              ★ AUDIT TASDIQLANDI ★
            </span>
            <span className="font-display text-xl font-extrabold tracking-wider my-0.5 leading-none text-white">
              APPROVED
            </span>
            <span className="font-mono-code text-[9px] tracking-widest uppercase font-semibold text-emerald-400">
              VERIFIED AI
            </span>
            <span className="font-mono-code text-xs font-bold mt-1 text-amber-300">
              {score}/100
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center mt-4">
          <div className="font-mono-code text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> MUVAFFAQIYATLI YAKUNLANDI
          </div>
          <h3 className="font-display text-2xl font-bold text-white leading-snug">
            {lessonTitle}
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Sizning amaliy audit javoblaringiz baholandi va rasmiy tasdiq muhri bilan shaxsiy pasportingizga kiritildi.
          </p>
        </div>

        {/* Scores summary */}
        <div className="mt-6 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-around">
          <div className="text-center">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase">AUDIT BAHOSI</div>
            <div className="font-mono-code text-2xl font-extrabold text-amber-400">
              {score}<span className="text-xs text-slate-400">/100</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase">STATUS</div>
            <div className="font-mono-code text-xs font-bold text-emerald-400 flex items-center gap-1.5 justify-center">
              <CheckCircle className="w-4 h-4" /> TASDIQLANDI
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {onNextLesson && (
            <button
              onClick={() => {
                onClose();
                onNextLesson();
              }}
              className="flex-1 btn-modern-primary py-3 px-4 text-xs font-bold font-mono-code flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Keyingi Darsga Oʻtish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono-code hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
