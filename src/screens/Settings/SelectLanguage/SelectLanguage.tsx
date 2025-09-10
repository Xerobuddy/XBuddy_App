import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import styles from "./selectLanguage.styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectLanguageScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  // Set English as default
  const [selectedLang, setSelectedLang] = useState<string>("en");

  const languages = [
    { code: "en", label: "English" },
    { code: "de", label: "German" },
  ];

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('appLanguage');
      if (savedLang) {
        setSelectedLang(savedLang);
        i18n.changeLanguage(savedLang);
      } else {
        i18n.changeLanguage('en'); // default
      }
    };
    loadLanguage();
  }, [i18n]);

  const handleLanguageChange = async (langCode: string) => {
    setSelectedLang(langCode);
    await AsyncStorage.setItem('appLanguage', langCode); // persist
    i18n.changeLanguage(langCode);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_1.jpg")}
      style={styles.background}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("select_language")}</Text>
      </View>

      {/* Language List */}
      <View style={styles.languageList}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              selectedLang === lang.code && styles.selectedButton,
            ]}
            onPress={() => handleLanguageChange(lang.code)}
          >
            <Text
              style={[
                styles.languageText,
                selectedLang === lang.code && styles.selectedText,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

export default SelectLanguageScreen;
