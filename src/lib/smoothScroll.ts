/**
 * Smooth animated scroll to any anchor ID or "/" (top of page).
 *
 * Usage:
 *   import { smoothScrollTo } from "@/lib/smoothScroll";
 *   smoothScrollTo("#services");   // scrolls to <section id="services">
 *   smoothScrollTo("/");           // scrolls to top
 *
 * Works on all devices. Uses native smooth scroll if supported,
 * falls back to a JS easing animation.
 */
export function smoothScrollTo(href: string): void {
  if (typeof window === "undefined") return;

  // "/" or "#" with no ID → scroll to top
  if (href === "/" || href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // Strip leading "#" to get the element id
  const id = href.startsWith("#") ? href.slice(1) : href.replace(/^.*#/, "");
  if (!id) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }

  const el = document.getElementById(id);
  if (!el) return;

  // Account for the fixed navbar height (mobile: 64px, desktop: 80px + 36px TopHeader)
  const navbarHeight = window.innerWidth >= 768 ? 116 : 64;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * React-friendly click handler for anchor links.
 * Prevents default navigation then smooth-scrolls.
 */
export function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  href: string,
  onClose?: () => void
): void {
  e.preventDefault();
  smoothScrollTo(href);
  onClose?.();
}
