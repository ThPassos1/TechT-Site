import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "../../effects/BorderBeam";

// Tipagem de um post
export interface PostData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  content: string;
}

// Props do componente
interface BlogCardProps {
  post: PostData;
}

// Componente BlogCard usando React.FC
const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article 
      className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl hover:border-[#00D2FF]/40 transition-all group relative overflow-hidden backdrop-blur"
      whileHover={{ y: -5, shadow: "0 20px 50px rgba(0, 210, 255, 0.2)" }}
    >
      
      {/* BorderBeam effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <BorderBeam colorFrom="#00D2FF" colorTo="#9D50BB" duration={12} />
      </div>
      
      {/* Glow decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/5 blur-3xl -z-10 group-hover:bg-[#00D2FF]/10 transition-all group-hover:scale-150 duration-500" />

      <div className="relative">
        {/* Categoria e data */}
        <div className="flex items-center gap-4 mb-6">
          <motion.span 
            className="text-[10px] font-bold text-[#00D2FF] bg-[#00D2FF]/10 px-3 py-1 rounded-full tracking-widest uppercase"
            whileHover={{ scale: 1.1 }}
          >
            {post.category}
          </motion.span>
          <span className="text-[10px] text-gray-500 font-mono uppercase">
            {post.date}
          </span>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-4 group-hover:text-[#00D2FF] transition-colors">
          {post.title}
        </h2>

        {/* Trecho do artigo */}
        <p className="text-gray-400 mb-8 line-clamp-3">{post.excerpt}</p>

        {/* Autor e link para o artigo */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <span className="text-xs font-bold text-gray-400">{post.author}</span>
          <Link
            to={`/blog/${post.id}`}
            className="text-[#00D2FF] font-bold text-xs uppercase tracking-widest flex items-center group/btn hover:text-white transition-all"
          >
            Ler Artigo
            <motion.span 
              className="ml-2 transition-transform"
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
