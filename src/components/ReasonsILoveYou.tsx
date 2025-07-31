import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Reason {
  text: string;
  emoji: string;
  bgColor: string;
}

const reasons: Reason[] = [
  {
    text: "You always laugh at my dumb jokes",
    emoji: "🤡",
    bgColor: "bg-love-pink"
  },
  {
    text: "You're the warmest hug on my coldest day",
    emoji: "🤗",
    bgColor: "bg-love-lavender"
  },
  {
    text: "You make ordinary moments feel magical",
    emoji: "✨",
    bgColor: "bg-love-blue"
  },
  {
    text: "Your smile lights up my entire world",
    emoji: "😊",
    bgColor: "bg-love-peach"
  },
  {
    text: "You believe in me even when I don't",
    emoji: "💪",
    bgColor: "bg-love-coral"
  },
  {
    text: "You're my favorite person to be weird with",
    emoji: "🤪",
    bgColor: "bg-love-pink"
  },
  {
    text: "You make me want to be the best version of myself",
    emoji: "🌟",
    bgColor: "bg-love-lavender"
  },
  {
    text: "Every day with you is an adventure",
    emoji: "🗺️",
    bgColor: "bg-love-blue"
  }
];

const ReasonsILoveYou = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(reasons.length).fill(false));
  const [clickedCards, setClickedCards] = useState<boolean[]>(new Array(reasons.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    setClickedCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });

    // Create floating hearts effect
    createFloatingHearts();
  };

  const createFloatingHearts = () => {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'fixed inset-0 pointer-events-none z-50';
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div');
      heart.textContent = '💕';
      heart.className = 'absolute text-2xl opacity-0';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = '100%';
      heart.style.animation = `floatingHearts ${2 + Math.random() * 2}s linear forwards`;
      heart.style.animationDelay = Math.random() * 0.5 + 's';
      heartsContainer.appendChild(heart);
    }

    setTimeout(() => {
      document.body.removeChild(heartsContainer);
    }, 4000);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 magical-gradient opacity-5"></div>
      
      {/* Floating Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-pink/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 30 + 20}px`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-romantic text-5xl md:text-6xl text-center mb-4 text-primary">
          Reasons I Love You
        </h2>
        <p className="font-elegant text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Just a few of the million reasons why you're absolutely amazing 💕
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={el => refs.current[index] = el}
              className={`transition-all duration-700 ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <Card
                className={`p-6 cursor-pointer group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 romantic-shadow hover:heart-shadow transition-all duration-500 transform hover:scale-105 ${
                  clickedCards[index] ? 'animate-bounce-in-heart' : ''
                }`}
                onClick={() => handleCardClick(index)}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 ${reason.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 group-hover:animate-heart-pulse">
                    {reason.emoji}
                  </div>
                  <p className="font-handwritten text-lg text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">
                    {reason.text}
                  </p>
                </div>

                {/* Click effect overlay */}
                {clickedCards[index] && (
                  <div className="absolute inset-0 heart-gradient opacity-20 animate-pulse"></div>
                )}

                {/* Hover sparkles */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-love-pink animate-sparkle">✨</span>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="font-romantic text-2xl text-primary mb-4">
            Click on any card to send love! 💕
          </p>
          <p className="font-elegant text-muted-foreground">
            And there are so many more reasons... I could write forever! 💌
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReasonsILoveYou;