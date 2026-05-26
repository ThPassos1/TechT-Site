import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { fetchProjects } from '../../services/portfolioService';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import { Project } from '../../types';
import { ShineEffect } from '../effects/ShineEffect';
import GlowBorder from '../effects/GlowBorder';
import { useAppPreferences } from '../../context/AppPreferencesContext';
import TypewriterHeadline from '../effects/TypewriterHeadline';

const Portfolio: React.FC = () => {
  const { locale } = useAppPreferences();
  const { data: projects, loading } = useFetch<Project[]>(() => fetchProjects(locale));
  const reducedMotion = useReducedMotion();
  const titlePrefix = locale === 'pt' ? 'Criando ' : 'Building ';
  const titleHighlight = locale === 'pt' ? 'Experiências' : 'Experiences';
  const headingDelay = reducedMotion ? 0 : 0.36;
  const headingInterval = reducedMotion ? 0 : 70;
  const titleDoneDelay = reducedMotion
    ? 0
    : (headingDelay * 1000 + (titlePrefix.length + titleHighlight.length) * headingInterval) / 1000 + 0.1;

  return (
    <section id="projetos" className="py-24 bg-[#080808]">
      <Container>
        <div className="mb-16">
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={headingDelay * 1000}
            charIntervalMs={headingInterval}
            className="text-4xl md:text-5xl font-bold mb-4"
            segments={[
              { text: titlePrefix },
              { text: titleHighlight, className: GRADIENTS.text },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: titleDoneDelay }}
            className="text-gray-400 text-lg max-w-xl"
          >
            {locale === 'pt'
              ? 'Uma seleção das nossas últimas entregas no cenário digital.'
              : 'A selection of our latest digital projects and execution models.'}
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <GlowBorder
                  className="rounded-2xl block bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,210,255,0.2)]"
                  thickness="1.5px"
                  duration={`${5 + (idx % 3)}s`}
                  hoverOnly
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />

                    {/* Shine Effect Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity">
                      <ShineEffect duration={2.2} delay={0.1}>
                        <div className="w-full h-full" />
                      </ShineEffect>
                    </div>
                  </div>

                  <div className="p-6 relative">
                    <span className="text-xs font-bold text-[#00D2FF] uppercase tracking-widest mb-2 block">
                      {project.category}
                    </span>

                    <h3 className="text-xl font-bold mb-3">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-300 hover:bg-[#00D2FF]/20 transition-all"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className={`w-2 h-2 rounded-full ${GRADIENTS.primary} shadow-[0_0_10px_#00D2FF]`}
                    />
                  </div>
                </GlowBorder>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Portfolio;
