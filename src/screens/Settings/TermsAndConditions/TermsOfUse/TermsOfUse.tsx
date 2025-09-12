import React from "react";
import { Text, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./termsOfUse.styles";

export default function TermsOfUse() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../../assets/images/background/bg_1.jpg")}
      style={styles.background}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>{"< Back"}</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Terms of Use</Text>
    </ImageBackground>
  );
}
