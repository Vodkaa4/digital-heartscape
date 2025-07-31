import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Heart } from 'lucide-react';

const FinalCelebration = () => {
  const [hugSent, setHugSent] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const sendVirtualHug = () => {
    setHugSent(true);
    setShowFireworks(true);
    
    // Create fireworks effect
    createFireworks();
    
    // Reset after animation
    setTimeout(() => {
      setHugSent(false);
      setShowFireworks(false);
    }, 3000);
  };

  const createFireworks = () => {
    const colors = ['#ff69b4', '#ff1493', '#ff6347', '#ffd700', '#98fb98', '#87ceeb'];
    
    for (let i = 0; i < 50; i++) {
      const firework = document.createElement('div');
      firework.className = 'fixed pointer-events-none z-50 w-2 h-2 rounded-full';
      firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      firework.style.left = '50%';
      firework.style.top = '50%';
      firework.style.animation = `firework ${1 + Math.random()}s ease-out forwards`;
      firework.style.animationDelay = Math.random() * 0.5 + 's';
      
      const angle = (Math.PI * 2 * i) / 50;
      const distance = 100 + Math.random() * 200;
      firework.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
      firework.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
      
      document.body.appendChild(firework);

      setTimeout(() => {
        if (document.body.contains(firework)) {
          document.body.removeChild(firework);
        }
      }, 2000);
    }

    // Add confetti
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.textContent = ['🎉', '🎊', '💕', '✨', '🌟'][Math.floor(Math.random() * 5)];
      confetti.className = 'fixed pointer-events-none z-50';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-50px';
      confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
      confetti.style.animation = `confettiFall ${3 + Math.random() * 2}s linear forwards`;
      confetti.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(confetti);

      setTimeout(() => {
        if (document.body.contains(confetti)) {
          document.body.removeChild(confetti);
        }
      }, 5000);
    }
  };

  const saveAsMemory = () => {
    // Create a simple text file with the love message
    const loveMessage = `💕 A Digital Love Letter 💕

This website was created with all my heart, just for you.

Every animation, every word, every detail was crafted to show you how much you mean to me.

You are my sunshine, my adventure, my home, and my forever.

Thank you for being you, and for letting me love you.

Forever yours,
With all my love 💖

Created on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([loveMessage], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'our-love-letter.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-screen flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 love-gradient opacity-20"></div>
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-love-pink/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 40 + 20}px`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main Message */}
        <div className="mb-16">
          <h2 className="font-romantic text-6xl md:text-8xl mb-8 text-primary animate-heart-pulse">
            Every Day With You
          </h2>
          <h3 className="font-romantic text-4xl md:text-5xl mb-6 text-primary/80">
            Feels Like a Celebration
          </h3>
          <div className="text-6xl mb-8 animate-bounce">💖</div>
        </div>

        {/* Interactive Elements */}
        <Card className="p-8 md:p-12 romantic-shadow bg-white/90 backdrop-blur-sm mb-12">
          <p className="font-elegant text-2xl md:text-3xl leading-relaxed text-foreground mb-8">
            You've reached the end of this little digital love letter, but our story is just beginning. 
            Every day I get to love you is a gift I never want to take for granted.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button
              onClick={sendVirtualHug}
              disabled={hugSent}
              className={`px-8 py-6 text-xl font-handwritten rounded-full transition-all duration-500 ${
                hugSent 
                  ? 'bg-green-500 text-white animate-heart-pulse' 
                  : 'heart-gradient text-white heart-shadow hover:scale-110'
              }`}
            >
              <Heart className="w-6 h-6 mr-2" />
              {hugSent ? 'Hug Sent! 🤗' : 'Send Virtual Hug 🤗'}
            </Button>

            <Button
              onClick={saveAsMemory}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-6 text-xl font-handwritten rounded-full hover:scale-105 transition-bounce"
            >
              <Download className="w-6 h-6 mr-2" />
              Save This Forever 💌
            </Button>
          </div>
        </Card>

        {/* Love Quotes Carousel */}
        <div className="space-y-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm romantic-shadow">
            <p className="font-handwritten text-lg md:text-xl text-foreground italic">
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine." 
              <span className="block mt-2 text-primary">- Maya Angelou</span>
            </p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm romantic-shadow">
            <p className="font-handwritten text-lg md:text-xl text-foreground italic">
              "But most importantly, you've shown me that love isn't just about the big moments. 
              It's about choosing each other every single day." 
              <span className="block mt-2 text-primary">- Us ✨</span>
            </p>
          </Card>
        </div>

        {/* Final Message */}
        <div className="mt-16 space-y-4">
          <p className="font-romantic text-3xl md:text-4xl text-primary">
            Thank you for being my everything 💕
          </p>
          <p className="font-elegant text-xl text-muted-foreground">
            I love you more than words could ever express
          </p>
          <div className="text-5xl animate-heart-pulse">
            💖✨🌟💫💕
          </div>
        </div>
      </div>

      {/* Fireworks overlay */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      )}

    </section>
  );
};

export default FinalCelebration;