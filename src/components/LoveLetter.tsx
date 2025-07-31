import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import loveLetterBg from '@/assets/love-letter-bg.jpg';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSealed, setIsSealed] = useState(false);

  const toggleLetter = () => {
    if (isSealed) {
      setIsSealed(false);
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const sealWithKiss = () => {
    setIsSealed(true);
    setIsOpen(false);
    
    // Create kiss animation
    const kissEffect = document.createElement('div');
    kissEffect.textContent = '💋';
    kissEffect.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl z-50 pointer-events-none';
    kissEffect.style.animation = 'bounceInHeart 1s ease-out forwards';
    document.body.appendChild(kissEffect);

    setTimeout(() => {
      document.body.removeChild(kissEffect);
    }, 1000);
  };

  const letterContent = `My Dearest Love,

Words feel so small when I try to capture how you make me feel. You've turned my world into something magical, where ordinary moments sparkle with joy and even the simplest things become adventures when I'm with you.

You know that way you laugh when something really tickles you? The way your whole face lights up and your eyes crinkle at the corners? That laugh is like sunshine breaking through clouds, and I'm pretty sure it could cure any bad day.

I love how you steal my hoodies and somehow look better in them than I ever did. I love how you get excited about the smallest things - a good song on the radio, finding the perfect avocado at the store, or when our favorite show drops a new episode. Your enthusiasm for life is contagious, and you've taught me to find magic in the mundane.

Remember our first real conversation? We talked for hours about everything and nothing, and I knew then that I wanted to have a million more conversations with you. Here we are, and I still get excited every time your name pops up on my phone.

You're my favorite person, my biggest cheerleader, my partner in all the silly adventures, and my safe harbor when the world gets overwhelming. You make me want to be the best version of myself, not because I have to, but because loving you has shown me what I'm capable of.

Every day with you feels like a gift I get to unwrap. Thank you for choosing me, for loving me, for being exactly who you are.

Forever and always yours,
With all my love 💕`;

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${loveLetterBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-romantic text-5xl md:text-6xl text-center mb-4 text-primary">
          A Letter From My Heart
        </h2>
        <p className="font-elegant text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Some words are too precious for just conversation 💌
        </p>

        <div className="flex justify-center">
          <div className="relative">
            {/* Letter Envelope/Paper */}
            <Card 
              className={`relative max-w-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 transition-all duration-1000 ${
                isOpen ? 'rotate-0 scale-100' : 'rotate-1 scale-95'
              } ${isSealed ? 'opacity-50 scale-90' : ''}`}
              style={{
                backgroundImage: `url(${loveLetterBg})`,
                backgroundSize: 'cover',
                backgroundBlendMode: 'soft-light'
              }}
            >
              {/* Wax Seal */}
              {isSealed && (
                <div className="absolute -top-4 right-8 z-20">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl border-4 border-red-700 animate-heart-pulse">
                    💋
                  </div>
                </div>
              )}

              <div className={`p-8 md:p-12 transition-all duration-700 ${isOpen && !isSealed ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <div className="text-center mb-8">
                  <h3 className="font-romantic text-3xl text-amber-900 mb-2">My Dearest Love</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-400 mx-auto rounded-full"></div>
                </div>

                <div className="font-handwritten text-lg leading-relaxed text-amber-900 space-y-4 max-h-96 overflow-y-auto">
                  {letterContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={sealWithKiss}
                    className="heart-gradient text-white font-handwritten text-lg px-8 py-3 rounded-full heart-shadow hover:scale-105 transition-bounce"
                  >
                    Seal with a Kiss 💋
                  </Button>
                </div>
              </div>

              {/* Closed Letter View */}
              {(!isOpen || isSealed) && (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-6 animate-heart-pulse">💌</div>
                  <h3 className="font-romantic text-3xl text-amber-900 mb-4">
                    {isSealed ? 'Sealed with Love' : 'A Love Letter Awaits'}
                  </h3>
                  <p className="font-elegant text-amber-700 mb-8">
                    {isSealed 
                      ? 'This letter has been sealed with a kiss 💋' 
                      : 'Click to open and read what\'s in my heart'
                    }
                  </p>
                  <Button
                    onClick={toggleLetter}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-handwritten text-lg px-8 py-3 rounded-full heart-shadow hover:scale-105 transition-bounce"
                  >
                    {isSealed ? 'Unseal Letter 💕' : 'Open Letter 💌'}
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Floating Love Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-400/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 20 + 15}px`
              }}
            >
              💌
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;