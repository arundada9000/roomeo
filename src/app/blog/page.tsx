"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, MapPin, Users, Sparkles, BookOpen, PenLine, Newspaper } from "lucide-react";

import { blogPosts as posts } from "@/data/blog";

const categories = ["All", "Guides", "Industry", "Landlords", "Company", "Safety"];

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter((p) => p.category === activeCategory);

  const featured = activeCategory === "All" ? filteredPosts.find((p) => p.featured) : null;
  const rest = activeCategory === "All" ? filteredPosts.filter((p) => !p.featured) : filteredPosts;

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" as const }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-primary/[0.07] blur-[160px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/[0.04] blur-[100px]"
          />
        </div>

        {/* Floating decorations */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute top-24 right-[12%] hidden lg:block"
        >
          <div className="h-14 w-14 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm rotate-12 flex items-center justify-center shadow-xl">
            <PenLine className="h-6 w-6 text-primary/60" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-28 left-[10%] hidden lg:block"
        >
          <div className="h-12 w-12 rounded-xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm -rotate-6 flex items-center justify-center shadow-xl">
            <BookOpen className="h-5 w-5 text-amber-500/60" />
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.div variants={fadeIn} className="flex justify-center mb-8">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 shadow-xl shadow-primary/10"
            >
              <Newspaper className="h-10 w-10 text-primary" />
            </motion.div>
          </motion.div>
          <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-primary/[0.06] border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-6 shadow-lg shadow-primary/5">
            <Sparkles className="h-3.5 w-3.5" />
            Stories & Insights
          </motion.span>
          <motion.h1 variants={fadeIn} className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 leading-[0.95]">
            The Roomeo{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>
          <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Stories, guides, and insights about renting, housing, and building a better rental
            experience across Nepal.
          </motion.p>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="border-b border-border/30">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  cat === activeCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 sm:py-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          >
            <Link href={`/blog/${featured.slug}`} className="group grid gap-8 lg:grid-cols-2 lg:items-center rounded-[2.5rem] border border-border/50 bg-card overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/20 block">
              <div className="relative h-72 lg:h-full min-h-[360px] overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-foreground shadow-xl">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Featured Story
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-14">
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-6">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
                    {featured.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {featured.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featured.readTime}</span>
                </div>
                <h2 className="text-2xl font-black text-foreground sm:text-3xl mb-4 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{featured.excerpt}</p>
                <span className="group/link inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </span>
              </div>
              </Link>
          </motion.div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="pb-24 sm:pb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <motion.div
                key={post.slug}
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
              <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full rounded-3xl border border-border/50 bg-card overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="group/link flex items-center gap-2 text-sm font-bold text-primary">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </span>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      </main>
      <Footer />
    </>
  );
}
