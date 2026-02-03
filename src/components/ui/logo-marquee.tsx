'use client';

import Image from 'next/image';

interface LogoMarqueeProps {
  logos?: Array<{ name: string; logo: string }>;
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  // Default partner colleges/institutions
  const defaultLogos = [
    { name: 'AISkool', logo: '/images/aiskool-logo.webp' },
    // Add more partner logos here
  ];

  const displayLogos = logos || defaultLogos;
  
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...displayLogos, ...displayLogos];

  return (
    <div className="relative overflow-hidden py-12 bg-gradient-to-r from-transparent via-primary/5 to-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <div className="flex animate-marquee hover:pause-marquee">
        {duplicatedLogos.map((college, index) => (
          <div
            key={`${college.name}-${index}`}
            className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
          >
            <div className="relative h-16 w-32 md:h-20 md:w-40 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image
                src={college.logo}
                alt={college.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .pause-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
