import { useRef } from 'react';
import RomanticHero from '@/components/RomanticHero';
import LoveTimeline from '@/components/LoveTimeline';
import ReasonsILoveYou from '@/components/ReasonsILoveYou';
import PhotoGallery from '@/components/PhotoGallery';
import LoveLetter from '@/components/LoveLetter';
import LoveQuiz from '@/components/LoveQuiz';
import FinalCelebration from '@/components/FinalCelebration';
import BackgroundMusic from '@/components/BackgroundMusic';

const Index = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background Music Component */}
      <BackgroundMusic />
      
      {/* Hero Section */}
      <RomanticHero onScrollToNext={scrollToTimeline} />
      
      {/* Love Timeline */}
      <div ref={timelineRef}>
        <LoveTimeline />
      </div>
      
      {/* Reasons I Love You */}
      <ReasonsILoveYou />
      
      {/* Photo Gallery */}
      <PhotoGallery />
      
      {/* Love Letter */}
      <LoveLetter />
      
      {/* Interactive Quiz */}
      <LoveQuiz />
      
      {/* Final Celebration */}
      <FinalCelebration />
    </div>
  );
};

export default Index;
