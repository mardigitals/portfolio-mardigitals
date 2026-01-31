import {FC, memo, PropsWithChildren, useMemo} from 'react'; // <--- Asegurate que useMemo esté acá

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';

export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {name, skills} = skillGroup;
  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-center text-lg font-bold text-black-100">{name}</span>
      <div className="flex flex-col gap-y-4">
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
  
  // El useMemo corregido
  const percentage = useMemo(() => Math.round((level / max) * 100), [level, max]);

  return (
    <div className="flex flex-col gap-y-1.5">
      <div className="flex justify-between items-end px-2">
        <span className="text-sm font-bold text-black-200">{name}</span>
      </div>
      
      {/* Barra con efecto 3D para Mar Digitals */}
      <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #0891b2 0%, #06b6d4 100%)'
          }}
        >
          {/* Brillo superior para efecto cristalino */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-40" />
          
          {/* Destello en el borde derecho */}
          <div className="absolute right-0 top-0 h-full w-1 bg-white/20 blur-[1px]" />
        </div>
      </div>
    </div>
  );
});

Skill.displayName = 'Skill';