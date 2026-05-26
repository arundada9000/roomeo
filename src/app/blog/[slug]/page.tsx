import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { blogPosts } from "@/data/blog";
import { Calendar, Clock, ArrowLeft, Share2, Link as LinkIcon, Mail, MessageCircle, Copy } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="relative bg-background overflow-hidden pb-20 sm:pb-32">
        {/* Background glow */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        {/* Hero Section */}
        <div className="mx-auto max-w-[900px] px-4 pt-12 sm:pt-20 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
              {post.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 leading-[1.1]">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            {post.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Article Body */}
        <article className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>The Importance of Location</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
            </p>
            <blockquote>
              "Finding the right room isn't just about the physical space. It's about finding a community that feels like home."
            </blockquote>
            <h3>Key Takeaways</h3>
            <ul>
              <li>Always visit the neighborhood at different times of the day.</li>
              <li>Check for essential amenities within walking distance.</li>
              <li>Talk to potential neighbors if possible to gauge the community vibe.</li>
            </ul>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </p>
          </div>

          {/* Share Section */}
          <div className="mt-16 flex items-center justify-between border-t border-b border-border/40 py-6">
            <span className="font-bold text-foreground">Share this article:</span>
            <div className="flex gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <LinkIcon className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors" title="Copy Link">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
