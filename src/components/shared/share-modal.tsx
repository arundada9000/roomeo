"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Download, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("share-qrcode");
    if (!svg) return;
    
    // Convert SVG to canvas and download as PNG
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `roomeo-qr-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-[110] mx-auto max-w-md bg-surface rounded-t-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 pb-2">
              <h2 className="text-xl font-bold text-foreground">Share this space</h2>
              <button 
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 pt-4 flex flex-col items-center gap-6">
              
              {/* QR Code */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-border/40">
                <QRCodeSVG 
                  id="share-qrcode"
                  value={url} 
                  size={160} 
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "/favicon.ico", // Using a placeholder since we might not have a logo readily available in public
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex w-full gap-3">
                <button 
                  onClick={handleDownloadQR}
                  className="flex-1 flex flex-col items-center gap-2 rounded-2xl bg-secondary hover:bg-secondary/80 p-4 transition-colors"
                >
                  <Download className="h-5 w-5 text-foreground" />
                  <span className="text-xs font-bold text-foreground">Save QR</span>
                </button>

                {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                  <button 
                    onClick={handleNativeShare}
                    className="flex-1 flex flex-col items-center gap-2 rounded-2xl bg-secondary hover:bg-secondary/80 p-4 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-foreground" />
                    <span className="text-xs font-bold text-foreground">More</span>
                  </button>
                )}
              </div>

              {/* Copy Link Input */}
              <div className="w-full">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Direct Link</label>
                <div className="flex w-full items-center gap-2 rounded-xl border border-border/60 bg-background p-1.5">
                  <input 
                    type="text" 
                    readOnly 
                    value={url}
                    className="flex-1 bg-transparent px-3 text-sm text-muted-foreground focus:outline-none"
                  />
                  <button 
                    onClick={handleCopy}
                    className="flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
