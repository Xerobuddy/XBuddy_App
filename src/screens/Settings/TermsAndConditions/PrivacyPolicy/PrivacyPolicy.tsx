import React from "react";
import { Text, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./privacyPolicy.styles";

export default function PrivacyPolicy() {
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
      <Text style={styles.title}>Privacy Policy</Text>
    </ImageBackground>
  );
}
