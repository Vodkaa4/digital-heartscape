import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // You would replace this with an actual romantic music file
    // For demo purposes, we'll create a simple audio element
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // In a real implementation, you'd add a romantic song:
    // audioRef.current.src = "/romantic-song.mp3";
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Note: In real implementation, you'd have an actual audio file
      // audioRef.current.play().catch(console.error);
      console.log('Music would play here - add your romantic song file');
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const togglePlayerVisibility = () => {
    setShowPlayer(!showPlayer);
  };

  return (
    <>
      {/* Floating Music Control */}
      <div className="fixed bottom-6 right-6 z-50">
        {showPlayer ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 romantic-shadow flex items-center gap-3 transition-all duration-300 hover:bg-white">
            <Button
              onClick={togglePlayPause}
              className="rounded-full w-12 h-12 p-0 heart-gradient text-white hover:scale-110 transition-bounce"
            >
              {isPlaying ? (
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              ) : (
                <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-b-2 border-t-transparent border-b-transparent ml-1"></div>
              )}
            </Button>
            
            <Button
              onClick={toggleMute}
              className="rounded-full w-10 h-10 p-0 bg-love-pink/20 hover:bg-love-pink/30 text-primary border-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={togglePlayerVisibility}
              className="rounded-full w-8 h-8 p-0 bg-love-lavender/20 hover:bg-love-lavender/30 text-primary border-0"
            >
              <span className="text-xs">−</span>
            </Button>
            
            <div className="hidden md:block">
              <p className="font-handwritten text-sm text-primary font-semibold">Romantic Vibes</p>
              <p className="font-handwritten text-xs text-muted-foreground">
                {isPlaying ? '♪ Playing...' : 'Click to play'}
              </p>
            </div>
          </div>
        ) : (
          <Button
            onClick={togglePlayerVisibility}
            className="rounded-full w-14 h-14 p-0 heart-gradient text-white hover:scale-110 transition-bounce"
          >
            <Music className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Music Notes Animation */}
      {isPlaying && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-love-pink/30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: '20px'
              }}
            >
              ♪
            </div>
          ))}
        </div>
      )}

      {/* Instructions for adding real music */}
      {isPlaying && (
        <div className="fixed top-4 left-4 z-50 bg-love-pink/90 text-white p-3 rounded-lg max-w-xs">
          <p className="font-handwritten text-sm">
            💡 To add real music: Replace the audio source in BackgroundMusic.tsx with your romantic song file!
          </p>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;