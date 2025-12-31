import { Link } from "react-router-dom";
import React from "react";

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
    <article className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-[#00D2FF]/30 transition-all group relative overflow-hidden">
      
      {/* Glow decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/5 blur-3xl -z-10 group-hover:bg-[#00D2FF]/10 transition-colors" />

      {/* Categoria e data */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[10px] font-bold text-[#00D2FF] bg-[#00D2FF]/10 px-3 py-1 rounded-full tracking-widest uppercase">
          {post.category}
        </span>
        <span className="text-[10px] text-gray-500 font-mono uppercase">
          {post.date}
        </span>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>

      {/* Trecho do artigo */}
      <p className="text-gray-400 mb-8 line-clamp-3">{post.excerpt}</p>

      {/* Autor e link para o artigo */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <span className="text-xs font-bold text-gray-300">{post.author}</span>
        <Link
          to={`/blog/${post.id}`}
          className="text-white font-bold text-xs uppercase tracking-widest flex items-center group/btn"
        >
          Ler Artigo
          <span className="ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
