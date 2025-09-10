// XerostomiaIntroScreen.tsx
import React from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import BgImage from "../../../assets/images/background/bg_2.jpg";
import { xerostomiaStyles as styles } from "./xerostomia.styles";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import TopImage from "../../../assets/images/illustrations/waterDrop_hi.png";

type Props = StackScreenProps<RootStackParamList, "XerostomiaScreen">;

export default function XerostomiaIntroScreen({ route, navigation }: Props) {
  const { reportId } = route.params;

  const handleNext = () => {
    navigation.navigate("XerostomiaQuestion" as any, {
      reportId,
      questionNumber: 1,
    });
  };

  return (
    <ImageBackground source={BgImage} style={styles.container}>
      {/* Back button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Image source={TopImage} resizeMode="contain"/>
        <Text style={styles.title}>Xerostomia{'\n'}Inventory</Text>
        <Text style={styles.subtitle}>We use the Xerostomia Inventory (XI) tobetter understand the extent of your subjective dry mouth. This short questionnaire is made up of five questions, each with three possible answers.</Text>
      </View>

      {/* OK button */}
      <TouchableOpacity style={styles.okButton} onPress={handleNext}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
