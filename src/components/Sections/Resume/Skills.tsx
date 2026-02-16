import {motion} from 'framer-motion';
import {FC, memo, PropsWithChildren, useMemo} from 'react';

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';
import {useProgressAnimation} from '../../../hooks/useProgressAnimation';

// 1. Componente que agrupa las habilidades (El que faltaba)
export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {name, skills} = skillGroup;
  return (
    <div className="flex flex-col gap-y-4 rounded-xl bg-neutral-200 p-6 shadow-sm border border-neutral-400">
      <span className="text-center text-lg font-bold text-black border-b border-neutral-400 pb-2">
        {name}
      </span>
      <div className="flex flex-col gap-y-5">
        {skills.map((skill, index) => (
          <Skill key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
});

SkillGroup.displayName = 'SkillGroup';

// 2. Componente de la barra individual con animación de carga
export const Skill: FC<{skill: SkillType}> = memo(({skill}) => {
  const {name, level, max = 10} = skill;
  const percentage = useMemo(() => Math.round((level / max) * 100), [level, max]);
  
  // Hook para detectar el scroll y disparar la carga
  const {ref, controls} = useProgressAnimation();

  return (
    <div className="flex flex-col gap-y-2" ref={ref}>
      <div className="flex justify-between items-end px-1">
        <span className="text-sm font-bold text-neutral-800">{name}</span>
      </div>
      
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white border border-neutral-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
        <motion.div 
          animate={controls}
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          style={{
            background: 'linear-gradient(90deg, #0891b2 0%, #06b6d4 100%)'
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          variants={{
            visible: { width: `${percentage}%` }
          }}
        >
          {/* Efectos visuales de la barra */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-40" />
          <div className="absolute right-0 top-0 h-full w-1 bg-white/20 blur-[1px]" />
        </motion.div>
      </div>
    </div>
  );
});

Skill.displayName = 'Skill';