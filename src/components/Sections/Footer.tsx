import {BoltIcon, ChevronUpIcon} from '@heroicons/react/24/solid';
import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Socials from '../Socials';

const currentYear = new Date().getFullYear();

const Footer: FC = memo(() => (
  <div className="relative bg-neutral-900 px-4 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
    <div className="absolute inset-x-0 -top-4 flex justify-center sm:-top-6 z-20">
    {/* Capa 1: Maneja la aparición inicial al hacer scroll */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Capa 2: Maneja exclusivamente el rebote infinito */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <a
          className="flex items-center justify-center rounded-full bg-neutral-100 p-2 shadow-xl ring-white ring-offset-2 ring-offset-gray-900 focus:outline-none focus:ring-2 transition-transform hover:scale-110"
          href={`/#${SectionId.Hero}`}
        >
          <ChevronUpIcon className="h-6 w-6 text-cyan-500 sm:h-8 sm:w-8" />
        </a>
      </motion.div>
    </motion.div>
  </div>

    <div className="flex flex-col items-center gap-y-6">
      {/* Iconos de Redes Sociales */}
      <div className="flex gap-x-4 text-neutral-500">
        <Socials />
      </div>

      {/* Créditos de Mar Digitals: Bolt + Logo */}
      <a
        className="-m-2 flex items-center gap-x-3 rounded-md p-2 transition-all duration-300 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        href="https://instagram.com/mardigitals.arg"
        rel="noopener noreferrer"
        target="_blank">
        <div className="flex items-center gap-x-2">
          {/* Animación de pulso para el rayo */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}>
            <BoltIcon className="h-5 w-5 text-cyan-500" />
          </motion.div>
          <span className="text-sm text-neutral-400">developed by</span>
          <img 
            alt="Mar Digitals" 
            className="h-16 w-auto grayscale transition-all duration-300 hover:grayscale-0" 
            src="/mar-digitals-logo.png" 
          />
        </div>
      </a>

      {/* Copyright Final */}
      <span className="text-sm text-neutral-700">© Copyright {currentYear} Mario Ricotti</span>
    </div>
  </div>
));

Footer.displayName = 'Footer';
export default Footer;