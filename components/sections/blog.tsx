import { SITE_CONFIG } from "../../siteConfig";
import Container from '../ui/Container';
import BlogCard from './blog/BlogCard';

const Blog = () => {
  return (
    <main className="pt-32 pb-24 bg-[#050505]">
      <Container>
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {SITE_CONFIG.blog.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {SITE_CONFIG.blog.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SITE_CONFIG.blog.posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Blog;
