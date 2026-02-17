import {ArrowTopRightOnSquareIcon, LockClosedIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {FC, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {isMobile} from '../../config';
import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import {useScrollReveal} from '../../hooks/useScrollReveal';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  // Hook para detectar el scroll en la sección
  const {ref, controls} = useScrollReveal(0.1);

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-12">
        
      {/* Título con subrayado animado en vaivén */}
      <div className="flex flex-col items-center gap-y-3">
        <motion.h2 
          initial={{opacity: 0, y: -20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className="text-3xl font-bold text-white tracking-tight sm:text-4xl"
        >
          Algunos de mis proyectos
        </motion.h2>
        
        {/* Contenedor de la barra para limitar el movimiento */}
        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-neutral-700">
          <motion.div 
            animate={{ 
              x: [-60, 60] // Se mueve de izquierda a derecha
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "mirror", // Hace que "vuelva" suavemente
              ease: "easeInOut" 
            }}
            className="h-full w-1/2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
          />
        </div>
      </div>

        {/* Grilla con Animación de Cascada (Stagger) */}
        <motion.div 
          animate={controls}
          className="w-full columns-2 md:columns-3 lg:columns-4 gap-6"
          initial="hidden"
          ref={ref}
          variants={{
            hidden: {opacity: 0},
            visible: {
              opacity: 1,
              transition: {staggerChildren: 0.2}
            }
          }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div 
              className="pb-6 break-inside-avoid" 
              key={`${item.title}-${index}`}
              variants={{
                hidden: {opacity: 0, y: 20},
                visible: {opacity: 1, y: 0}
              }}
            >
              <div className="group relative h-max w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:ring-cyan-500/50">
                <Image 
                  alt={item.title} 
                  className="h-full w-full transition-transform duration-500 group-hover:scale-110" 
                  placeholder="blur" 
                  src={item.image} 
                />
                <ItemOverlay item={item} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

/**
 * ItemOverlay: Mantiene tu lógica original de Mobile corregida con estilos nuevos
 */
const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item: {url, title, description, disabled}}) => {
  const [mobile, setMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    }
  }, []);

  useDetectOutsideClick(linkRef, () => setShowOverlay(false));

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      if (mobile && !showOverlay) {
        event.preventDefault();
        setShowOverlay(true);
      }
    },
    [mobile, showOverlay, disabled],
  );

  return (
    <a
      className={classNames(
        'absolute inset-0 flex flex-col justify-center bg-gray-900/90 p-4 transition-all duration-500', disabled ? 'cursor-not-allowed' : 'cursor-pointer', 
        !mobile ? 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0' : (showOverlay ? 'opacity-100' : 'opacity-0'),
      )}
      href={disabled ? undefined : url}
      onClick={handleItemClick}
      ref={linkRef}
      target={disabled ? undefined : "_blank"}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 text-center">
        <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
        <p className="text-xs text-gray-300 sm:text-sm">{description}</p>
        
      {disabled ? (
          <div className="mt-2 flex items-center gap-x-1 text-xs font-bold text-amber-500">
            <LockClosedIcon className="h-4 w-4" />
            <span className="uppercase tracking-wider">En construcción</span>
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-x-1 text-xs font-bold text-cyan-400">
            <span>VER PROYECTO</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </div>
        )}
      </div>
    </a>
  );
});

ItemOverlay.displayName = 'ItemOverlay';