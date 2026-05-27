import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, MessageCircle } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

const footerLinks = {
  Product: [
    { label: "Explore Rooms", href: "/explore" },
    { label: "List Property", href: "/landlord" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border/20 bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group mb-6" id="footer-logo">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-lg shadow-primary/10 overflow-hidden border border-border/50">
                <Image 
                  src="/icons/icon-192x192.png" 
                  alt="Roomeo Logo" 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-foreground">Roomeo</span>
            </Link>
            <p className="max-w-xs text-[15px] leading-relaxed text-muted-foreground mb-8">
              The fastest, cleanest, and most premium way to find a nearby room. Discover verified spaces with real-time availability today.
            </p>
            
            <NewsletterForm />
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-extrabold text-foreground tracking-widest uppercase mb-6">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-[15px] font-medium text-muted-foreground transition-all hover:text-primary"
                      >
                        {link.label}
                        <ArrowRight className="ml-1 h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-8 md:flex-row overflow-hidden">
          <p className="text-sm text-muted-foreground font-medium shrink-0">
            &copy; {new Date().getFullYear()} Roomeo Inc. All rights reserved.
          </p>
          
          {/* Social Links Marquee */}
          <div className="flex-1 w-full max-w-full overflow-hidden relative border-l border-r border-border/20 mx-4 mask-edges">
            {/* The outer container clips the content, mask-edges adds a fade effect on sides */}
            <div className="flex w-fit animate-marquee hover:pause whitespace-nowrap py-2">
              {/* Double the array for seamless scrolling */}
              {[...socials, ...socials].map((social, i) => (
                <a 
                  key={`${social.name}-${i}`} 
                  href={social.url} 
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 mx-3 rounded-full border border-border/50 bg-secondary/30 px-5 py-2.5 text-xs font-bold text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary shrink-0"
                >
                  <span>{social.name}</span>
                  <span className="font-medium opacity-60 transition-opacity group-hover:opacity-100">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socials = [
  { name: "Fb", handle: "arundada9000", url: "https://facebook.com/arundada9000" },
  { name: "Insta", handle: "arundada9000", url: "https://instagram.com/arundada9000" },
  { name: "GitHub", handle: "arundada9000", url: "https://github.com/arundada9000" },
  { name: "YT", handle: "@arundada9000", url: "https://youtube.com/@arundada9000" },
  { name: "LinkedIn", handle: "@arundada9000", url: "https://linkedin.com/in/arundada9000" },
  { name: "TikTok", handle: "@arundada9000", url: "https://tiktok.com/@arundada9000" },
];
