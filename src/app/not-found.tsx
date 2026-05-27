import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-secondary/50 shadow-2xl shadow-primary/5 border border-border/50">
        <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-xl" />
        <span className="text-6xl font-black text-primary drop-shadow-sm">404</span>
      </div>
      
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        Lost in the hallways?
      </h1>
      
      <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground">
        It seems the room you are looking for doesn&apos;t exist, has been moved, or is currently undergoing renovation. Let&apos;s get you back home.
      </p>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          Return to Lobby
        </Link>
        <Link
          href="/explore"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
        >
          <Search className="h-4 w-4" />
          Explore Available Rooms
        </Link>
      </div>
    </div>
  );
}
