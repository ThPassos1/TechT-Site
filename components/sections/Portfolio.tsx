import React from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { fetchProjects } from '../../services/portfolioService';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import { Project } from '../../types';

const Portfolio: React.FC = () => {
  const { data: projects, loading } = useFetch<Project[]>(fetchProjects);

  return (
    <section id="portfolio" className="py-24 bg-[#080808]">
      <Container>
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Criando <span className={GRADIENTS.text}>Experiências</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            Uma seleção das nossas últimas inovações em todo o cenário digital.
          </p>
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
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00D2FF]/30 transition-all"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>

                <div className="p-6">
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
                        className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-300"
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
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Portfolio;
