import React from "react";
import { Text, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./termsOfUse.styles";
import Video from "react-native-video";

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
      {/* Video (not background, just below title) */}
      <Video
        source={require("../../../../assets/videos/comp_1.webm")} // or .mov
        style={styles.video}
        resizeMode="contain"
        repeat
        muted
        // For Android transparency
        useTextureView={false} 
      />
    </ImageBackground>
  );
}
