"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { smoothScrollTo } from "@/utils/scroll";
import { SUPPORTED_LANGUAGES } from "@/constants";

export const useScrollOrNavigate = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        requestAnimationFrame(() => {
          smoothScrollTo(hash, hash === "home");
        });
      }
    };

    handleHashScroll();

    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [pathname]);

  const scrollOrNavigate = (targetPath: string, elementId?: string) => {
    const cleanTargetPath =
      targetPath.endsWith("/") && targetPath !== "/"
        ? targetPath.slice(0, -1)
        : targetPath;

    if (elementId) {
      const langRegex = new RegExp(
        `^\\/(${SUPPORTED_LANGUAGES.join("|")})(\\/|$)`,
      );

      const normalizedPathname = pathname.replace(langRegex, "/") || "/";
      const normalizedTarget = cleanTargetPath.replace(langRegex, "/") || "/";

      if (normalizedPathname === normalizedTarget) {
        requestAnimationFrame(() => {
          smoothScrollTo(elementId, elementId === "home");
        });
      } else {
        router.push(`${cleanTargetPath}#${elementId}`);
      }
    } else {
      router.push(cleanTargetPath);
    }
  };

  return { scrollOrNavigate };
};
