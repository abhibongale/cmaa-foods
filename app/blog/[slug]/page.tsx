import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "../../data/siteConfig";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { blogPosts } = siteConfig;
  const post = blogPosts?.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <Header />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Blog Post */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          {post.slogan && (
            <p className="text-base md:text-lg font-semibold text-amber-600 uppercase tracking-wider mb-4">
              {post.slogan}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 bg-gray-100">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:my-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts or CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 border-t border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Explore More Stories
          </h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Back to Home
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const { blogPosts } = siteConfig;
  if (!blogPosts) return [];
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { blogPosts } = siteConfig;
  const post = blogPosts?.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Extract text from HTML content for description
  const textContent = post.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: post.title,
    description: textContent,
  };
}

