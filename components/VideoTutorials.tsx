
import React, { useState } from 'react';
import { Play, Clock, ChevronRight, X, PlayCircle } from 'lucide-react';
import { Language, translations } from '../translations';

interface VideoTutorialsProps {
  isDarkMode: boolean;
  lang: Language;
}

interface Video {
  id: string;
  title: { en: string; ar: string };
  category: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  thumbnail: string;
  videoUrl: string;
}

const VIDEOS: Video[] = [
  {
    id: '1',
    title: { en: 'Chess Basics: Moving the Pieces', ar: 'أساسيات الشطرنج: حركة القطع' },
    category: 'beginner',
    duration: 12,
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/fKxG8KjH1Qg'
  },
  {
    id: '2',
    title: { en: 'Opening Principles for Kids', ar: 'مبادئ الافتتاح للأطفال' },
    category: 'beginner',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/fKxG8KjH1Qg'
  },
  {
    id: '3',
    title: { en: 'The Power of the Fork', ar: 'قوة الشوكة (الفورك)' },
    category: 'intermediate',
    duration: 10,
    thumbnail: 'https://images.unsplash.com/photo-1544085311-11a028465b0c?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/fKxG8KjH1Qg'
  },
  {
    id: '4',
    title: { en: 'Common Tactical Motifs', ar: 'الأنماط التكتيكية الشائعة' },
    category: 'intermediate',
    duration: 18,
    thumbnail: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/fKxG8KjH1Qg'
  },
  {
    id: '5',
    title: { en: 'Advanced Endgame Strategy', ar: 'استراتيجية النهايات المتقدمة' },
    category: 'advanced',
    duration: 22,
    thumbnail: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/fKxG8KjH1Qg'
  },
  {
    id: '6',
    title: { en: 'Analyzing Grandmaster Games', ar: 'تحليل مباريات الماسترز' },
    category: 'advanced',
    duration: 30,
    thumbnail: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/fKxG8KjH1Qg'
  },
];

type CategoryKey = 'all' | 'beginner' | 'intermediate' | 'advanced';

const VideoTutorials: React.FC<VideoTutorialsProps> = ({ isDarkMode, lang }) => {
  const t = translations[lang].tutorials;
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = activeCategory === 'all' 
    ? VIDEOS 
    : VIDEOS.filter(v => v.category === activeCategory);

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'beginner': return 'bg-blue-500 text-white';
      case 'intermediate': return 'bg-purple-500 text-white';
      case 'advanced': return 'bg-amber-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <section id="tutorials" className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 left-0 w-full h-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-custom-lime/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
            {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-lime to-lime-400">{t.title_accent}</span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.desc}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {(Object.keys(t.categories) as CategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-custom-lime text-[#00172D] shadow-[0_0_20px_rgba(132,204,22,0.3)] scale-105'
                  : (isDarkMode 
                      ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white' 
                      : 'bg-white text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-lg')
              }`}
            >
              {t.categories[key]}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className={`group relative rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-750 border border-slate-700/50 hover:border-custom-lime/30' 
                  : 'bg-white border border-slate-100 hover:border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60'
              }`}
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title[lang]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-2xl">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
                  <Clock className="w-3 h-3 text-custom-lime" />
                  {video.duration} {t.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getCategoryColor(video.category)}`}>
                    {t.categories[video.category]}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-4 line-clamp-2 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {video.title[lang]}
                </h3>
                
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
                  <button 
                    onClick={() => setSelectedVideo(video)}
                    className="flex items-center gap-2 text-sm font-black uppercase tracking-wide group/btn transition-colors hover:text-custom-lime"
                  >
                    <span className={isDarkMode ? 'text-slate-300 group-hover/btn:text-custom-lime' : 'text-slate-600 group-hover/btn:text-custom-lime'}>
                      {t.play}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-custom-lime flex items-center justify-center text-[#00172D] transform group-hover/btn:scale-110 transition-transform">
                      {lang === 'en' ? <ChevronRight className="w-3 h-3" /> : <ChevronRight className="w-3 h-3 rotate-180" />}
                    </div>
                  </button>
                  <PlayCircle className={`w-5 h-5 opacity-20 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedVideo(null)}
          ></div>
          <div className="relative w-full max-w-5xl aspect-video rounded-[32px] overflow-hidden bg-black shadow-2xl animate-fade-in-up border border-white/10">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
            <iframe 
              src={`${selectedVideo.videoUrl}?autoplay=1`}
              title={selectedVideo.title[lang]}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoTutorials;
    