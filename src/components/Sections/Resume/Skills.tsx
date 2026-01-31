import {FC, memo, PropsWithChildren, useMemo} from 'react';

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';

export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {name, skills} = skillGroup;
  return (
    /* Contenedor con fondo grisáceo suave, padding y bordes redondeados */
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

export const Skill: FC<{skill: SkillType}> = memo(({skill}) => {
  const {name, level, max = 10} = skill;
  const percentage = useMemo(() => Math.round((level / max) * 100), [level, max]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-end px-1">
        <span className="text-sm font-bold text-neutral-800">{name}</span>
      </div>
      
      {/* Fondo de la barra en blanco puro para que contraste con el gris del grupo */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white border border-neutral-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #0891b2 0%, #06b6d4 100%)'
          }}
        >
          {/* Brillo superior */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-40" />
          {/* Destello derecho */}
          <div className="absolute right-0 top-0 h-full w-1 bg-white/20 blur-[1px]" />
        </div>
      </div>
    </div>
  );
});

Skill.displayName = 'Skill';