// app/components/NotFoundContent.tsx
import Link from 'next/link';

// Simulación de los contenidos traducidos
const translations: Record<string, { title: string; description: string; home: string }> = {
  es: {
    title: '404 - Página no encontrada',
    description: 'Parece que esta página no existe. ¡Volvamos a un lugar seguro!',
    home: 'Ir a la página de inicio',
  },
  en: {
    title: '404 - Page Not Found',
    description: "It looks like this page doesn't exist. Let's get you back to safety!",
    home: 'Go to the home page',
  },
};

interface NotFoundContentProps {
  locale: string;
}

/**
 * Componente que muestra el contenido de la página 404,
 * obteniendo las traducciones según el 'locale' proporcionado.
 */
export default function NotFoundContent({ locale }: NotFoundContentProps) {
  const lang = locale in translations ? locale : 'es'; // Usar español como fallback
  const content = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest">
        404
      </h1>
      <div className="bg-indigo-600 px-4 text-sm rounded rotate-12 absolute text-white shadow-lg">
        {content.title}
      </div>
      <p className="mt-8 text-lg text-center max-w-md">{content.description}</p>
      
      {/* Enlaza al root del locale actual */}
      <Link 
        href={`/${lang}`}
        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
      >
        {content.home}
      </Link>
    </div>
  );
}