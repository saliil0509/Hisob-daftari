import React, { useState, useEffect } from 'react';
import { MediaItem } from '../types';
import { Sparkles, CheckCircle2, AlertCircle, X, ArrowRight, Play, Youtube, Award } from 'lucide-react';
import { soundEffects } from '../utils/sound';
import { getYouTubeEmbedUrl } from '../utils/youtube';

interface AudioQuizModalProps {
  media: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (capitalGained: number) => void;
  isAlreadySolved: boolean;
}

export const AudioQuizModal: React.FC<AudioQuizModalProps> = ({
  media,
  isOpen,
  onClose,
  onSuccess,
  isAlreadySolved
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  }, [isOpen, media]);

  if (!isOpen || !media) return null;

  const quiz = media.audioQuiz || media.videoQuiz || {
    question: 'Ushbu videodarsda aytilgan asosiy tushuncha qanday?',
    options: ['Toʻgʻri rejalashtirish', 'Nazoratsiz xarajat', 'Hech qanday tahlilsiz', 'Faqat qarz olish'],
    correctIndex: 0,
    explanation: 'Moliyaviy intizom va asosli tahlil doimiy barqarorlik omilidir.',
    rewardCapital: 50
  };

  const isCorrect = selectedOption === quiz.correctIndex;
  const embedUrl = getYouTubeEmbedUrl(media.youtubeUrl);

  const handleSelect = (index: number) => {
    if (isSubmitted && isCorrect) return;
    soundEffects.playClick();
    setSelectedOption(index);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === quiz.correctIndex) {
      soundEffects.playSuccess();
      if (!isAlreadySolved) {
        onSuccess(quiz.rewardCapital);
      }
    } else {
      soundEffects.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#111a2e] to-[#0a0f1d] border-2 border-cyan-400/40 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col text-white">
        {/* Header bar */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
              <Youtube className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-widest text-cyan-300 font-bold">
                VIDEO DARSLIK & EKSPRESS-QUIZ
              </div>
              <h3 className="font-display text-base sm:text-lg text-white font-bold line-clamp-1">
                {media.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* YouTube Video Player Embed */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-xl">
            <iframe
              src={embedUrl}
              title={media.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
            <div className="text-slate-300 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 font-bold">
                {media.videoCategory || 'Video Taʼlim'}
              </span>
              {media.speaker && <span className="text-slate-400">👤 {media.speaker}</span>}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Mukofot: +{quiz.rewardCapital} Kapital</span>
            </div>
          </div>

          {/* Quiz Question Box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-code text-cyan-300 font-bold uppercase">
              <span>🎯 Video-Quiz Savoli:</span>
              {isAlreadySolved && (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Kapital Olingan
                </span>
              )}
            </div>

            <p className="font-display text-base font-bold text-white leading-relaxed">
              {quiz.question}
            </p>

            <div className="space-y-2">
              {quiz.options.map((opt, idx) => {
                const isThisSelected = selectedOption === idx;
                let optionStyle =
                  'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-400/60';

                if (isSubmitted) {
                  if (idx === quiz.correctIndex) {
                    optionStyle =
                      'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500';
                  } else if (isThisSelected && !isCorrect) {
                    optionStyle =
                      'bg-rose-950/60 border-rose-500 text-rose-300';
                  }
                } else if (isThisSelected) {
                  optionStyle =
                    'bg-cyan-400/15 border-cyan-400 text-cyan-200 font-bold ring-1 ring-cyan-400';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-code font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {isSubmitted && idx === quiz.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation on submit */}
            {isSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="font-mono-code font-bold uppercase mb-1">
                  {isCorrect ? '✅ Toʻgʻri javob!' : '❌ Xato javob:'}
                </div>
                <p>{quiz.explanation}</p>
              </div>
            )}

            {/* Submit / Finish button */}
            <div className="pt-2 flex justify-end">
              {isSubmitted && isCorrect ? (
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onClose();
                  }}
                  className="btn-modern-primary py-2.5 px-6 text-xs font-bold font-mono-code flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Yakunlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="btn-modern-primary py-2.5 px-6 text-xs font-bold font-mono-code flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Javobni Tekshirish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
