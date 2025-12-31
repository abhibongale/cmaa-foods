import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogPage() {
  const { blogPosts } = siteConfig;

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <Banner />
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-gray-600">No blog posts available yet.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <Header />

      {/* Blog Header */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Our Stories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the journey behind our authentic Puneri snacks, from traditional recipes to your doorstep.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  {post.slogan && (
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
                      {post.slogan}
                    </p>
                  )}
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}

