import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';

const RomanticHero = ({ onScrollToNext }: { onScrollToNext: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const fullText = "Hi Love... do you know what day it is?";

  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setCurrentText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 magical-gradient opacity-30"></div>
      
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-pink opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`text-center z-10 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="font-romantic text-4xl md:text-6xl lg:text-7xl text-white mb-8 romantic-shadow">
          <span className="inline-block">
            {currentText}
            <span className="animate-blink">|</span>
          </span>
        </h1>
        
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-elegant text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Every moment with you feels like magic ✨
          </p>
          
          <Button
            onClick={onScrollToNext}
            className="heart-gradient text-white font-semibold px-8 py-6 text-lg rounded-full heart-shadow hover:scale-105 transition-bounce relative overflow-hidden group"
          >
            <span className="relative z-10">Click to begin our journey 💞</span>
            <div className="absolute inset-0 heart-gradient opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default RomanticHero;