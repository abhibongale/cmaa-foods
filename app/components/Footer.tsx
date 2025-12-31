"use client";

import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  Instagram,
  Youtube,
};

export default function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">{footer.socialMedia.title}</h3>
            <div className="flex gap-4">
              {footer.socialMedia.links.map((link, index) => {
                const IconComponent = iconMap[link.icon] || Facebook;
                return (
                  <a
                    key={index}
                    href={link.url}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <label className="block font-semibold mb-4">
              {footer.newsletter.title}
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={footer.newsletter.placeholder}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
              />
              <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="font-semibold mb-4">{footer.contact.title}</h3>
            <p className="text-gray-400 text-sm">{footer.contact.message}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-sm text-gray-400">
            {footer.bottomBar.message}
          </p>
        </div>
      </div>
    </footer>
  );
}

