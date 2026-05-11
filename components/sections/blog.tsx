import React from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from "../../siteConfig";
import Container from '../ui/Container';
import BlogCard from './blog/BlogCard';
import { GRADIENTS } from '../../constants';

const Blog = () => {
  return (
    <main className="pt-32 pb-24 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9D50BB]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#00D2FF]/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
      
      <Container className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${GRADIENTS.text}`}>
            {SITE_CONFIG.blog.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {SITE_CONFIG.blog.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {SITE_CONFIG.blog.posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </main>
  );
};

export default Blog;
