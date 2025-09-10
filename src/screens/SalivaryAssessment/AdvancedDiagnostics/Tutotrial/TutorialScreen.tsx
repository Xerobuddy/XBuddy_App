import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import tutorialStyles from "./tutorial.styles";

export default function TutorialScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require("../../../../assets/images/background/bg_2.jpg")}
      style={tutorialStyles.container}
      resizeMode="cover"
    >
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={tutorialStyles.roundButton}>
        <ArrowLeftIcon size={22} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={tutorialStyles.title}>Tutorial</Text>

      {/* Tutorial Image */}
      <View style={tutorialStyles.imageContainer}>
        <Image
          source={require("../../../../assets/images/illustrations/waterDrop_hi.png")} // 🔥 add your tutorial image here
          style={tutorialStyles.tutorialImage}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}
