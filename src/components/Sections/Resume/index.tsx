import {FC, memo} from 'react';

import {education, experience, SectionId, skills} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import {SkillGroup} from './Skills';
import TimelineItem from './TimelineItem';

const Resume: FC = memo(() => {
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Educación">
          {education.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Trabajos">
          {experience.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Habilidades">
          <div className="flex flex-col gap-y-6 pb-8">
            {/* Sección de Idiomas con Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-x-2 rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 ring-1 ring-inset ring-cyan-500/30">
                <span>🇪🇸</span> Español (Nativo)
              </span>
              <span className="flex items-center gap-x-2 rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 ring-1 ring-inset ring-neutral-300">
                <span>🇺🇸</span> Inglés (B1)
              </span>
              <span className="flex items-center gap-x-2 rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 ring-1 ring-inset ring-neutral-300">
                <span>🇮🇹</span> Italiano (B1)
              </span>
            </div>

            {/* Soft Skills con Iconos */}
            <div className="flex flex-col gap-y-3 border-l-2 border-cyan-500 pl-4">
              <p className="text-sm italic text-neutral-600">
                "Combino comunicación y gestión del tiempo para resolver problemas complejos de forma colaborativa y adaptable."
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skills.map((skillgroup, index) => (
              <SkillGroup key={`${skillgroup.name}-${index}`} skillGroup={skillgroup} />
            ))}
          </div>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
