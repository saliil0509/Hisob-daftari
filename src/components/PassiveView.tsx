import React, { useState } from 'react';
import { MediaItem } from '../types';
import { Video, Sparkles, CheckCircle2, ArrowLeft, Play, HelpCircle, Award, Youtube } from 'lucide-react';
import { soundEffects } from '../utils/sound';
import { AudioQuizModal } from './AudioQuizModal';
import { getYouTubeThumbnail } from '../utils/youtube';

interface PassiveViewProps {
  mediaList: MediaItem[];
  passiveCapital: number;
  solvedQuizzes: string[];
  onRewardCapital: (mediaId: string, capital: number) => void;
  onNavigate: (view: string) => void;
}

export const PassiveView: React.FC<PassiveViewProps> = ({
  mediaList,
  passiveCapital,
  solvedQuizzes,
  onRewardCapital,
  onNavigate
}) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const handleOpenVideoAndQuiz = (item: MediaItem) => {
    soundEffects.playClick();
    setSelectedMedia(item);
    setIsQuizModalOpen(true);
  };

  const handleQuizSuccess = (capitalGained: number) => {
    if (selectedMedia) {
      onRewardCapital(selectedMedia.id, capitalGained);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Back Button */}
      <button
        onClick={() => {
          soundEffects.playClick();
          onNavigate('home');
        }}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono-code text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Bosh sahifaga qaytish
      </button>

      {/* Passive Video Header with Capital Counter */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 border-2 border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-cyan-300 font-bold px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40">
            <Video className="w-3.5 h-3.5" />
            PASSIV VIDEO TAʼLIM VA MASTERKLASSLAR
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white font-extrabold">
            Video Taʼlim Kutubxonasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Iqtisodiyot, Moliya, Buxgalteriya va Islom moliyasi boʻyicha eng sara YouTube videodarslarni tomosha qiling. Har bir videodars yakunida 1 daqiqalik Video-Quizni yechib, <b className="text-amber-400">Bonus Bilim Kapitali</b> ishlab oling!
          </p>
        </div>

        {/* Capital Score Box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-400/40 flex items-center gap-4 shrink-0 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400">
              PASSIV BILIM KAPITALI
            </div>
            <div className="font-mono-code text-2xl font-extrabold text-amber-400">
              +{passiveCapital} <span className="text-xs font-normal text-slate-300">soʻm</span>
            </div>
            <div className="text-[11px] font-mono-code text-slate-400">
              {solvedQuizzes.length} / {mediaList.length} video yakunlandi
            </div>
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((m) => {
          const isSolved = solvedQuizzes.includes(m.id);
          const ytThumb = getYouTubeThumbnail(m.youtubeUrl);

          return (
            <div
              key={m.id}
              className="rounded-3xl overflow-hidden bg-[#111a2e] border border-slate-800 hover:border-cyan-400/50 flex flex-col justify-between group transition-all shadow-xl hover:-translate-y-1"
            >
              {/* Media Thumbnail */}
              <div
                onClick={() => handleOpenVideoAndQuiz(m)}
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={ytThumb}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono-code text-[10px] uppercase font-bold tracking-wider bg-slate-900/90 text-cyan-300 border border-cyan-500/40">
                  {m.videoCategory || 'Videodars'}
                </span>

                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg font-mono-code text-[10px] bg-slate-950/80 text-white border border-slate-700">
                  ⏱️ {m.duration}
                </span>
              </div>

              {/* Media Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {m.speaker && (
                    <div className="text-xs font-mono-code text-teal-300">
                      👤 {m.speaker}
                    </div>
                  )}
                  <h4 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {m.desc}
                  </p>
                </div>

                {/* 1 daqiqalik Video-Quiz Trigger */}
                <div className="pt-3 border-t border-slate-800">
                  <button
                    onClick={() => handleOpenVideoAndQuiz(m)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSolved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-400 hover:text-slate-950'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isSolved ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Video Koʻrildi & Yechildi</span>
                        </>
                      ) : (
                        <>
                          <Youtube className="w-4 h-4 text-rose-400" />
                          <span>Tomosha Qilish & Quiz (+{m.audioQuiz?.rewardCapital || 50})</span>
                        </>
                      )}
                    </span>
                    <span className="text-[10px] font-bold">▶</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Quiz Modal with YouTube Player */}
      <AudioQuizModal
        media={selectedMedia}
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onSuccess={handleQuizSuccess}
        isAlreadySolved={selectedMedia ? solvedQuizzes.includes(selectedMedia.id) : false}
      />
    </div>
  );
};
