import { Variants } from 'framer-motion';

export const useHeroAnimation = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.0, // Espera a que el background cargue tras F5
      },
    },
  };

  // Efecto especial solicitado: Barrido de izquierda a derecha
  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.9, 
        ease: "easeOut" 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return { containerVariants, titleVariants, itemVariants };
};