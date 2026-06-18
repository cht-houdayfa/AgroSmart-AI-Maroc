import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, languageFlags, languageNames, dialectNames, type LanguageCode, type DarijaDialect } from '../i18n/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, dialect, setLanguage, setDialect, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: LanguageCode[] = ['darija', 'ar', 'fr', 'en'];
  const dialects: DarijaDialect[] = ['sous', ' Atlas', 'chaouia', 'doukkala', 'rifi', 'haouz'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: LanguageCode) => {
    setLanguage(lang);
    if (lang !== 'darija') {
      setIsOpen(false);
    }
  };

  const handleDialectSelect = (d: DarijaDialect) => {
    setDialect(d);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
          isOpen
            ? 'bg-white/20 ring-2 ring-white/30'
            : 'bg-white/10 hover:bg-white/15'
        }`}
      >
        <Globe className="w-5 h-5 text-white" />
        <span className="text-lg">{languageFlags[language]}</span>
        {!compact && (
          <>
            <span className="text-white font-medium hidden sm:inline">{languageNames[language]}</span>
            {dialect && (
              <span className="text-emerald-300 text-sm">({dialectNames[dialect]})</span>
            )}
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 z-50 overflow-hidden">
          {/* Languages */}
          <div className="p-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider px-3 py-2">{t.common.language}</p>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  language === lang && (lang !== 'darija' || !dialect)
                    ? 'bg-emerald-600/30 text-emerald-300'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{languageFlags[lang]}</span>
                <span className="flex-1 text-left">{languageNames[lang]}</span>
                {language === lang && (lang !== 'darija' || !dialect) && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            ))}
          </div>

          {/* Dialects for Darija */}
          {language === 'darija' && (
            <div className="border-t border-white/10 p-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider px-3 py-2">{t.common.dialect}</p>
              {dialects.map((d) => (
                <button
                  key={d}
                  onClick={() => handleDialectSelect(d)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    dialect === d
                      ? 'bg-emerald-600/30 text-emerald-300'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-600/30 flex items-center justify-center">
                    <span className="text-xs">🏜️</span>
                  </div>
                  <span className="flex-1 text-right">{dialectNames[d]}</span>
                  {dialect === d && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                </button>
              ))}
              {dialect && (
                <button
                  onClick={() => setDialect(null)}
                  className="w-full text-center text-xs text-gray-400 hover:text-white py-2 transition-colors"
                >
                  {t.common.all}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple language selector for buttons (modal/dropdown style)
export function LanguageSelector({ onSelect }: { onSelect?: () => void }) {
  const { language, setLanguage, t } = useLanguage();

  const languages: LanguageCode[] = ['darija', 'ar', 'fr', 'en'];

  return (
    <div className="grid grid-cols-2 gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => {
            setLanguage(lang);
            onSelect?.();
          }}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
            language === lang
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="text-xl">{languageFlags[lang]}</span>
          <span className="font-medium">{t.languages[lang === 'darija' ? 'darija' : lang === 'ar' ? 'arabic' : lang === 'fr' ? 'french' : 'english']}</span>
        </button>
      ))}
    </div>
  );
}
