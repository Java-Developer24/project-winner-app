'use client';

import { useState, useEffect } from 'react';
import HomeHero from '@/components/HomeHero';
import { GoDaddyLoader } from '@/components/GoDaddyLoader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if loader has already been shown in this session
    const loaderShown = sessionStorage.getItem('godaddy-loader-shown');
    if (loaderShown) {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setHasLoaded(true);
    // Mark loader as shown for this session
    sessionStorage.setItem('godaddy-loader-shown', 'true');
  };

  return (
    <>
      {isLoading && <GoDaddyLoader onComplete={handleLoaderComplete} />}
      <HomeHero />
    </>
  );
}