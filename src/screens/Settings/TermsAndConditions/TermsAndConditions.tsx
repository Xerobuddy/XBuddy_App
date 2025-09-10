import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import styles from "./termsAndCondition.styles";

export default function TermsAndConditions() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_2.jpg")}
      style={styles.background}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeftIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Terms & Conditions</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TermsOfUseScreen" as never)}
        >
          <Text style={styles.buttonText}>Terms of Use</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PrivacyPolicyScreen" as never)}
        >
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
