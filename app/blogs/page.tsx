import { useState } from "react";
import { blogPosts, blogCategories } from "../../content/blog";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { Reveal } from "../../components/ui/Reveal";
import { CtaBand } from "../../components/sections/CtaBand";
import { ThreeDCard } from "../../components/3d/ThreeDCard";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { CinematicImage } from "../../components/ui/CinematicImage";

export const metadata = {
  title: "Blogs",
  description: "Plain-English thinking on AI, data, and getting real results from Innoanswers.",
};

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="pt-28 sm:pt-36">
      {/* Page Header */}
      <section className="relative overflow-hidden py-14 lg:py-20 border-b border-[var(--border-subtle)]">
        <Container className="relative z-10">
          <div className="max-w-[820px] space-y-5">
            <Reveal>
              <span className="eyebrow">Blog</span>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="page-h1 text-[var(--ink)]">Insights on practical AI.</h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="lead-text text-[var(--body-text)]">
                Plain-English thinking on AI, data, and getting real results.
              </p>
            </Reveal>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-12 flex flex-wrap gap-2.5">
            {blogCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                    isSelected
                      ? "bg-[var(--btn-bg)] text-[var(--btn-ink)] shadow-sm"
                      : "bg-[var(--chip-bg)] text-[var(--chip-text)] border border-[var(--chip-border)] hover:bg-[var(--surface-hover)] hover:text-[var(--ink)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured Post with 3D Depth */}
      {(selectedCategory === "All" || featuredPost.category === selectedCategory) && (
        <section className="pb-12">
          <Container>
            <Reveal>
              <ThreeDCard className="rounded-[20px]" maxTilt={4} scale={1.01}>
                <a
                  href={`/blogs/${featuredPost.slug}`}
                  className="group block rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface)] overflow-hidden transition-all duration-200 hover:border-[var(--accent)]/50 shadow-md hover:shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Photo cover banner */}
                    <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
                      {featuredPost.coverImageSrc ? (
                        <CinematicImage
                          src={featuredPost.coverImageSrc}
                          alt={featuredPost.title}
                          aspectRatio="aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto h-full"
                          priority={true}
                          overlay={
                            <div className="absolute top-4 left-4 z-10">
                              <span className="inline-block rounded-md bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] px-3 py-1 text-xs font-semibold text-[var(--accent)] uppercase tracking-wider shadow-sm font-mono">
                                Featured • {featuredPost.category}
                              </span>
                            </div>
                          }
                        />
                      ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${featuredPost.gradientTheme}`} />
                      )}
                    </div>

                    {/* Post details */}
                    <div className="p-8 lg:p-12 lg:col-span-7 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs text-[var(--muted-text)]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {featuredPost.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {featuredPost.readTime}
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl leading-snug group-hover:text-[var(--accent)] transition-colors">
                          {featuredPost.title}
                        </h2>

                        <p className="text-[16px] leading-relaxed text-[var(--body-text)]">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--link)] group-hover:text-[var(--ink)]">
                        <span>Read full article</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </ThreeDCard>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Grid of Remaining Posts with 3D Depth */}
      <section className="py-12 bg-[var(--bg-alt)] border-t border-[var(--border-subtle)]">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post, idx) => (
              <Reveal key={post.slug} delayMs={idx * 60} className="flex">
                <ThreeDCard className="w-full h-full rounded-[16px]" maxTilt={6} scale={1.018}>
                  <a
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col justify-between rounded-[16px] border border-[var(--border-subtle)] bg-[var(--surface)] overflow-hidden transition-all duration-200 hover:border-[var(--accent)]/50 shadow-sm hover:shadow-xl w-full h-full"
                  >
                    <div>
                      {/* Cover Photo */}
                      <div className="border-b border-[var(--border-subtle)]">
                        {post.coverImageSrc ? (
                          <CinematicImage
                            src={post.coverImageSrc}
                            alt={post.title}
                            aspectRatio="aspect-[16/9]"
                            threshold={0.12}
                            overlay={
                              <div className="absolute top-3 left-3 z-10">
                                <span className="inline-block rounded-md bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider shadow-sm font-mono">
                                  {post.category}
                                </span>
                              </div>
                            }
                          />
                        ) : (
                          <div className={`h-44 w-full bg-gradient-to-br ${post.gradientTheme}`} />
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-[var(--muted-text)]">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="card-h3 mt-3 text-[19px] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="mt-3 text-[14px] leading-relaxed text-[var(--body-text)]">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--link)] group-hover:text-[var(--ink)] pt-4 border-t border-[var(--border-subtle)]">
                        <span>Read article</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                </ThreeDCard>
              </Reveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-16 text-center text-[var(--muted-text)]">
              No articles found in this category.
            </div>
          )}
        </Container>
      </section>

      {/* Closing CTA */}
      <CtaBand />
    </div>
  );
}
