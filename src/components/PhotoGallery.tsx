import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import coupleMemory1 from '@/assets/couple-memory-1.jpg';
import coupleMemory2 from '@/assets/couple-memory-2.jpg';

interface Photo {
  src: string;
  caption: string;
  date: string;
}

const photos: Photo[] = [
  {
    src: coupleMemory1,
    caption: "That perfect sunset when you said yes to being mine forever 🌅",
    date: "March 2023"
  },
  {
    src: coupleMemory2,
    caption: "Our cozy picnic where we laughed until our stomachs hurt 😂",
    date: "April 2023"
  },
  {
    src: coupleMemory1,
    caption: "Dancing in the rain because why not? Life's too short! 💃",
    date: "May 2023"
  },
  {
    src: coupleMemory2,
    caption: "That random Tuesday when you made me breakfast in bed 🥞",
    date: "June 2023"
  },
  {
    src: coupleMemory1,
    caption: "Our first adventure together - lost but happy 🗺️",
    date: "July 2023"
  },
  {
    src: coupleMemory2,
    caption: "Movie night turned into karaoke night (as usual) 🎤",
    date: "August 2023"
  }
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 love-gradient opacity-5"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-romantic text-5xl md:text-6xl text-center mb-4 text-primary">
          Our Memory Lane
        </h2>
        <p className="font-elegant text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Every picture tells a story, and every story makes me love you more 📸💕
        </p>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div key={index} className="group cursor-pointer" onClick={() => openLightbox(index)}>
              <Card className="overflow-hidden romantic-shadow hover:heart-shadow transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 heart-gradient opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                      <p className="font-handwritten text-sm mb-2">{photo.date}</p>
                      <p className="font-elegant text-lg">Click to view 💕</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="font-handwritten text-foreground leading-relaxed text-center">
                    {photo.caption}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto !== null && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              {/* Close button */}
              <Button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation buttons */}
              <Button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Photo and caption */}
              <div className="bg-white rounded-2xl overflow-hidden romantic-shadow">
                <img
                  src={photos[selectedPhoto].src}
                  alt={`Memory ${selectedPhoto + 1}`}
                  className="w-full max-h-[60vh] object-cover"
                />
                <div className="p-6 text-center love-gradient">
                  <p className="font-handwritten text-white text-lg mb-2">
                    {photos[selectedPhoto].date}
                  </p>
                  <p className="font-elegant text-white text-xl leading-relaxed">
                    {photos[selectedPhoto].caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;