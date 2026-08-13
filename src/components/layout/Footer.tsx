import React from 'react';
import { Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { RuixenGradientFooter } from '../ui/ruixen-gradient-footer';

export default function Footer() {
  return (
    <div className="bg-[#030303] text-white pt-24 border-t border-white/10 font-sans w-full relative z-10">
      <RuixenGradientFooter gradientHeight="50vh" className="relative z-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16 pt-12 relative z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-10">
            
            {/* Logo & Brand Info */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 w-max shadow-xl">
                <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-6 w-auto object-contain brightness-0 invert opacity-90" />
                <span className="text-white/20 font-light text-xl">|</span>
                <img src="/Partners/Brandforyoufull.png" alt="BrandForYou" className="h-7 w-auto object-contain brightness-0 invert opacity-90" />
              </div>
              <p className="mt-2 text-sm text-gray-400 font-medium max-w-sm leading-relaxed">
                Global Talent Hunt 2026. Showcase your skills, compete globally, and get discovered by industry leaders. Unlocking potential without boundaries.
              </p>
            </div>

            {/* Support & Contact */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Support & Contact</h3>
              <a href="https://wa.me/919505429380" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group w-max">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-400/10 group-hover:border-green-400/30 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+91 9505429380</span>
              </a>
              <a href="mailto:hello@fundfy.app" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group w-max">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-400/10 group-hover:border-purple-400/30 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">hello@fundfy.app</span>
              </a>
              <a href="https://linkedin.com/company/fundfy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group w-max">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-400/10 group-hover:border-blue-400/30 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>

            {/* Location / Office */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Office Address</h3>
              <a href="https://share.google/vwp4H20a17T0BlmCU" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-orange-400 transition-colors group w-max max-w-xs">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-400/10 group-hover:border-orange-400/30 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium flex items-center gap-1 text-white">
                    Hyderabad Headquarters
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-orange-400" />
                  </span>
                  <span className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Visit us in India's booming tech hub. Click to view on Google Maps.
                  </span>
                </div>
              </a>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 pb-2 font-mono text-xs uppercase tracking-wider text-gray-500">
            <span>© {new Date().getFullYear()} Fundfy.app & BrandForYou.</span>
            <span>Hyderabad · India</span>
          </div>
        </div>
      </RuixenGradientFooter>
    </div>
  );
}
