import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import coupleMemory1 from '@/assets/couple-memory-1.jpg';
import coupleMemory2 from '@/assets/couple-memory-2.jpg';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  image: string;
  emoji: string;
}

const timelineData: TimelineItem[] = [
  {
    date: "January 14, 2023",
    title: "First Time You Stole My Food",
    description: "Remember when you said you weren't hungry, then ate half my pizza? That's when I knew you were special 😋",
    image: coupleMemory1,
    emoji: "🍕"
  },
  {
    date: "February 20, 2023", 
    title: "Our First Adventure",
    description: "That magical sunset picnic where we talked until the stars came out. Best first date ever! ✨",
    image: coupleMemory2,
    emoji: "🌅"
  },
  {
    date: "March 15, 2023",
    title: "The Day You Made Me Laugh Until I Cried",
    description: "Your silly dance in the rain made me realize I could be completely myself with you 💃",
    image: coupleMemory1,
    emoji: "🤣"
  },
  {
    date: "Today",
    title: "Every Day with You",
    description: "Still stealing my food, still making me laugh, still making every day feel like an adventure 💕",
    image: coupleMemory2,
    emoji: "💖"
  }
];

const LoveTimeline = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(timelineData.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
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

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 love-gradient opacity-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <h2 className="font-romantic text-5xl md:text-6xl text-center mb-4 text-primary">
          Our Love Story
        </h2>
        <p className="font-elegant text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Every moment we've shared has been a chapter in our beautiful story 📖💕
        </p>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full heart-gradient rounded-full hidden md:block"></div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={el => refs.current[index] = el}
              className={`relative flex items-center mb-16 transition-all duration-1000 ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Desktop Layout */}
              <div className="hidden md:flex w-full items-center">
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-3 text-left pl-8'}`}>
                  <Card className="p-6 romantic-shadow hover:heart-shadow transition-romantic bg-card/90 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <h3 className="font-elegant text-xl font-semibold text-primary">{item.title}</h3>
                        <p className="font-handwritten text-love-coral text-sm">{item.date}</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">{item.description}</p>
                  </Card>
                </div>
                
                {/* Timeline Node */}
                <div className={`w-2/12 flex justify-center ${index % 2 === 0 ? 'order-2' : 'order-2'}`}>
                  <div className="w-6 h-6 heart-gradient rounded-full border-4 border-white romantic-shadow animate-heart-pulse"></div>
                </div>
                
                <div className={`w-5/12 ${index % 2 === 0 ? 'order-3' : 'pr-8'}`}>
                  <div className="relative group overflow-hidden rounded-2xl romantic-shadow">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 heart-gradient opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden w-full">
                <Card className="p-6 romantic-shadow hover:heart-shadow transition-romantic bg-card/90 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <h3 className="font-elegant text-xl font-semibold text-primary">{item.title}</h3>
                      <p className="font-handwritten text-love-coral text-sm">{item.date}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-foreground leading-relaxed">{item.description}</p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveTimeline;