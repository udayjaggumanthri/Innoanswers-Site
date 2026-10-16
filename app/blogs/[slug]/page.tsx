import { blogPosts, BlogPost } from "../../../content/blog";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/ui/Reveal";
import { CtaBand } from "../../../components/sections/CtaBand";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { CinematicImage } from "../../../components/ui/CinematicImage";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Innoanswers`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Innoanswers`,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug) || blogPosts[0];

  return (
    <div className="pt-[104px]">
      {/* Article Header */}
      <article className="py-12 lg:py-20">
        <Container>
          <div className="mx-auto max-w-[68ch]">
            {/* Back link */}
            <div className="mb-8">
              <a
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-[var(--link)] hover:text-[var(--ink)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to all posts</span>
              </a>
            </div>

            {/* Category badge */}
            <div className="mb-4">
              <span className="eyebrow">{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="mt-6 flex items-center gap-4 border-b border-[var(--border-subtle)] pb-8 text-sm text-[var(--muted-text)]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            {/* Post Cover Image with Cinematic IntersectionObserver */}
            {post.coverImageSrc && (
              <div className="my-8">
                <CinematicImage
                  src={post.coverImageSrc}
                  alt={post.title}
                  aspectRatio="aspect-[16/9]"
                  priority={true}
                />
              </div>
            )}

            {/* Structured body blocks (no markdown dependency) */}
            <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-[var(--body-text)]">
              {post.body.map((block, index) => {
                if (block.type === "paragraph") {
                  return <p key={index}>{block.text}</p>;
                }

                if (block.type === "heading") {
                  if (block.level === 2) {
                    return (
                      <h2
                        key={index}
                        className="pt-6 text-2xl font-medium tracking-tight text-[var(--ink)] sm:text-3xl"
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  return (
                    <h3
                      key={index}
                      className="pt-4 text-xl font-medium tracking-tight text-[var(--ink)]"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={index}
                      className="my-4 list-disc space-y-2 pl-6 text-[var(--body-text)]"
                    >
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </div>

            {/* Post footer navigation */}
            <div className="mt-16 border-t border-[var(--border-subtle)] pt-8 flex items-center justify-between">
              <a
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-[var(--link)] hover:text-[var(--ink)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to all posts</span>
              </a>

              <Button variant="secondary" href="/contact">
                Talk to our team
              </Button>
            </div>
          </div>
        </Container>
      </article>

      {/* Closing CTA */}
      <CtaBand />
    </div>
  );
}
