import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPlaceholder } from "@/components/home/BlogPlaceholder";
import { blogPosts, categories, BlogCategory } from "@/data/blogData";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "Todos">("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4">
                Blog <span className="text-gradient font-bold">MandaUmZap</span>
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Dicas práticas, tutoriais e insights para transformar sua prestação de serviços
              </p>
            </div>
          </div>
        </section>

        {/* Search and filters */}
        <section className="pb-8">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "Todos" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory("Todos")}
                >
                  Todos
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar artigos..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured post */}
        {featuredPost && selectedCategory === "Todos" && !searchQuery && (
          <section className="pb-12">
            <div className="container">
              <Card className="overflow-hidden border-transparent hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] md:aspect-auto">
                    <BlogPlaceholder category={featuredPost.category} className="h-full min-h-[280px]" />
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-muted-foreground">Destaque</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground font-light mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime} de leitura
                      </div>
                    </div>
                    <Link to={`/blog/${featuredPost.slug}`}>
                      <Button className="gap-2 w-fit">
                        Ler artigo
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Posts grid */}
        <section className="pb-20">
          <div className="container">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedCategory === "Todos" && !searchQuery ? regularPosts : filteredPosts).map((post) => (
                  <Card
                    key={post.id}
                    className="group overflow-hidden border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <BlogPlaceholder
                        category={post.category}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-light">
                        {post.excerpt}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                      >
                        Ler mais
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
    </main>
  );
};

export default Blog;
