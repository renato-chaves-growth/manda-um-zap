import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogData";
import { BlogPlaceholder } from "@/components/home/BlogPlaceholder";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Artigo não encontrado</h1>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Voltar ao blog
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-8 md:pt-32">
          <div className="container">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar ao blog
            </Link>
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de leitura
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured image */}
        <section className="pb-12">
          <div className="container">
            <div className="max-w-4xl">
              <div className="aspect-[2/1] rounded-2xl overflow-hidden">
                <BlogPlaceholder category={post.category} className="w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container">
            <article className="max-w-3xl prose prose-lg prose-primary">
              <div className="text-foreground font-light leading-relaxed whitespace-pre-line">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-semibold text-foreground mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <p key={index} className="font-semibold text-foreground my-4">
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="text-muted-foreground ml-4">
                        {paragraph.replace('- ', '')}
                      </li>
                    );
                  }
                  if (paragraph.trim() === '') {
                    return null;
                  }
                  return (
                    <p key={index} className="text-muted-foreground my-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl">
              <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Quer automatizar sua prestação de serviços?
                </h3>
                <p className="text-muted-foreground font-light mb-4">
                  Conheça os agentes do MandaUmZap e comece a economizar tempo hoje.
                </p>
                <Link to="/agentes">
                  <Button className="gap-2">
                    Conhecer agentes
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="pb-20">
            <div className="container">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Artigos relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                      <BlogPlaceholder 
                        category={relatedPost.category} 
                        className="transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
    </main>
  );
};

export default BlogPost;
