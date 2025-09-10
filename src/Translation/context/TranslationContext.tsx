import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEEPL_API_KEY = "14f2e56d-f0c8-4bce-af9e-0f60c67f849e:fx";
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

type TranslationCache = {
  [lang: string]: { [text: string]: string };
};

type TranslationContextType = {
  translate: (text: string) => Promise<string>;
  selectedLang: string;
  changeLanguage: (langCode: string) => Promise<void>;
};

const TranslationContext = createContext<TranslationContextType>({
  translate: async (text) => text,
  selectedLang: "en",
  changeLanguage: async () => { },
});

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [cache, setCache] = useState<TranslationCache>({});

  useEffect(() => {
    const load = async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      const savedCache = await AsyncStorage.getItem("translationCache");

      if (savedLang) setSelectedLang(savedLang);
      if (savedCache) setCache(JSON.parse(savedCache));
    };
    load();
  }, []);

  const saveCache = async (updatedCache: TranslationCache) => {
    setCache(updatedCache);
    await AsyncStorage.setItem("translationCache", JSON.stringify(updatedCache));
  };

  const translate = async (text: string) => {
    if (selectedLang === "en") return text;

    // ✅ Check cache first
    if (cache[selectedLang]?.[text]) {
      return cache[selectedLang][text];
    }

    try {
      const res = await fetch(DEEPL_API_URL, {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `text=${encodeURIComponent(text)}&target_lang=${selectedLang.toUpperCase()}`,
      });

      // 🔍 Check status before parsing
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`DeepL API Error ${res.status}:`, errorText);
        return text; // fallback to original text
      }

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        const raw = await res.text();
        console.error("DeepL JSON parse failed. Raw response:", raw);
        return text;
      }

      if (!data?.translations?.[0]?.text) {
        console.warn("DeepL returned no translations. Falling back to original:", text);
        return text;
      }

      const translated = data.translations[0].text;

      // ✅ Update cache
      const updatedCache = {
        ...cache,
        [selectedLang]: {
          ...(cache[selectedLang] || {}),
          [text]: translated,
        },
      };
      await saveCache(updatedCache);

      return translated;
    } catch (err) {
      console.error("Translation fetch error:", err);
      return text;
    }
  };

  const changeLanguage = async (langCode: string) => {
    setSelectedLang(langCode);
    await AsyncStorage.setItem("appLanguage", langCode);
  };

  return (
    <TranslationContext.Provider
      value={{ translate, selectedLang, changeLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
