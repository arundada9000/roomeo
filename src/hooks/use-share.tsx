"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ShareModal = dynamic(() => import("@/components/shared/share-modal"), { ssr: false });

export function useShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [shareData, setShareData] = useState({ url: "", title: "" });

  const openShare = (url: string, title: string) => {
    // If we're on client side and url is relative, make it absolute
    const fullUrl = typeof window !== "undefined" && url.startsWith("/") 
      ? `${window.location.origin}${url}` 
      : url;
      
    setShareData({ url: fullUrl, title });
    setIsOpen(true);
  };

  const closeShare = () => setIsOpen(false);

  const ShareComponent = () => (
    <ShareModal 
      isOpen={isOpen} 
      onClose={closeShare} 
      url={shareData.url} 
      title={shareData.title} 
    />
  );

  return { openShare, ShareComponent };
}
