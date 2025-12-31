// BlogPost.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { SITE_CONFIG } from "../../../siteConfig";
import Container from "../../ui/Container";

const BlogPost: React.FC = () => {
  // Pega o ID do post da URL
  const { id } = useParams();

  // Procura o post correspondente no SITE_CONFIG
  const post = SITE_CONFIG.blog.posts.find((p) => p.id === id);

  // Se o post não for encontrado
  if (!post) {
    return (
      <main className="pt-32 pb-24 bg-[#050505]">
        <Container>
          <h1 className="text-3xl font-bold text-white">
            Artigo não encontrado
          </h1>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 bg-[#050505]">
      <Container>
        <article className="max-w-3xl mx-auto">
          {/* Categoria */}
          <span className="text-xs font-bold text-[#00D2FF] uppercase tracking-widest">
            {post.category}
          </span>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
            {post.title}
          </h1>

          {/* Data e autor */}
          <p className="text-gray-400 mb-8">
            {post.date} · {post.author}
          </p>

          {/* Imagem do post */}
          {post.image && (
            <div className="mb-8">
              <img
                src={post.image} // usa o caminho definido no siteConfig
                alt={post.imageCaption || post.title}
                className="w-full rounded-xl object-cover"
              />
              {post.imageCaption && (
                <p className="text-gray-400 text-sm mt-2">{post.imageCaption}</p>
              )}
            </div>
          )}

          {/* Conteúdo do artigo */}
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Container>
    </main>
  );
};

export default BlogPost;
