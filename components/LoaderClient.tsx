'use client';

import { useState, useEffect } from 'react';
import Loader from './Loader';

export default function LoaderClient({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Alternativa: podrías también esperar un mínimo de tiempo
    const handleFinish = () => {
      setLoading(false);
      // Aquí van animaciones GSAP si quieres iniciar al terminar el loader
    };

    // Simular carga de imágenes, o usar IntersectionObserver/GSAP/etc.
    const timeout = setTimeout(handleFinish, 900000); // reemplázalo por lógica real de carga
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && children}
    </>
  );
}
