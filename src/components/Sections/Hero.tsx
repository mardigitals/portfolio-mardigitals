import {ChevronDownIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {FC, memo} from 'react';

import {heroData, SectionId} from '../../data/data';
import {useHeroAnimation} from '../../hooks/useHeroAnimation';
import Section from '../Layout/Section';
import Socials from '../Socials';

const Hero: FC = memo(() => {
  const {imageSrc, name, description, actions} = heroData;
  const {containerVariants, titleVariants, itemVariants} = useHeroAnimation();

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* 1. Background con Zoom */}
        <motion.div
          animate={{scale: [1, 1.1, 1]}}
          className="absolute inset-0 z-0"
          transition={{duration: 20, repeat: Infinity, ease: 'linear'}}>
          <Image
            alt={`${name}-image`}
            className="h-full w-full object-cover"
            priority
            src={imageSrc}
          />
        </motion.div>

        {/* 2. Contenido Principal */}
        <motion.div
          animate="visible"
          className="z-10 max-w-screen-lg px-4 lg:px-0"
          initial="hidden"
          variants={containerVariants}>
          <div className="flex flex-col items-center gap-y-6 rounded-xl bg-gray-800/40 p-6 text-center shadow-lg backdrop-blur-sm ring-1 ring-white/10">
            <motion.h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl" variants={titleVariants}>
              {name}
            </motion.h1>
            <motion.div variants={itemVariants}>{description}</motion.div>
            <motion.div className="flex gap-x-4 text-neutral-100" variants={itemVariants}><Socials /></motion.div>
            <motion.div className="flex w-full flex-wrap justify-center gap-4" variants={itemVariants}>
              {actions.map(({href, text, primary, Icon}) => (
                <motion.a
                  className={classNames(
                    'flex items-center gap-x-2 rounded-full px-6 py-3 text-sm font-bold transition-all sm:text-base',
                    primary ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'border-2 border-white text-white hover:bg-white/10',
                  )}
                  href={href}
                  key={text}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}>
                  {text}
                  {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6" />}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* 3. Indicador de Scroll */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          {/* Capa 1: Entrada inicial con delay */}
          <motion.div
            initial={{opacity: 0, y: -20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: 2}} // Delay para que cargue el contenido primero
          >
            {/* Capa 2: Rebote Infinito */}
            <motion.div
              animate={{y: [0, 10, 0]}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <a
                className="flex items-center justify-center rounded-full bg-white p-1 shadow-lg ring-white ring-offset-2 ring-offset-gray-700/80 transition-all hover:scale-110 sm:p-2"
                href={`/#${SectionId.About}`}>
                <ChevronDownIcon className="h-5 w-5 text-cyan-500 sm:h-6 sm:w-6" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;