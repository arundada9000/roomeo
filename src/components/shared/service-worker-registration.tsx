"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    )
      return;

    let refreshing = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((reg) => {
        reg.addEventListener("updatefound", () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              toast("Update available", {
                description: "A new version of Roomeo is ready.",
                duration: Infinity,
                closeButton: true,
                action: {
                  label: "Update",
                  onClick: () => {
                    reg.waiting?.postMessage({ type: "SKIP_WAITING" });
                  },
                },
              });
            }
          });
        });
      })
      .catch(() => {});
  }, []);

  return null;
}
