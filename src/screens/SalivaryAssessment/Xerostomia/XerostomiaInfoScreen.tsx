// XerostomiaInfoScreen.tsx
import React, { useState } from "react";
import { Text, TouchableOpacity, ImageBackground, View, Image } from "react-native";
import { Slider } from "@miblanchard/react-native-slider"; // ✅ named export
import auth from "@react-native-firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import BgImage from "../../../assets/images/background/bg_2.jpg";
import { xerostomiaStyles as styles } from "./xerostomia.styles";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { HomeIcon } from "react-native-heroicons/outline";
import TopImage from "../../../assets/images/illustrations/waterDrop_hi.png";

export default function XerostomiaInfoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { reportId } = route.params;

  const [sliderValue, setSliderValue] = useState<number>(0);

  const getColor = (v: number) => (v <= 3 ? "green" : v <= 6 ? "orange" : "red");

  const handleNext = async () => {
    try {
      const userEmail = auth().currentUser?.email;
      if (!userEmail) return;

      await firestore()
        .collection("users")
        .doc(userEmail)
        .collection("reports")
        .doc(reportId)
        .update({ xerostomiaScore: sliderValue });

      await firestore()
        .collection("admin")
        .doc("reports")
        .collection("reports")
        .doc(reportId)
        .update({ xerostomiaScore: sliderValue });

      navigation.navigate("DrugSearchScreen", { reportId });
    } catch (e) {
      console.error("Error updating xerostomia score:", e);
    }
  };

  const handleHome = async () => {
    try {
      const userEmail = auth().currentUser?.email;
      if (!userEmail) return;

      // Delete the report from both user and admin collections
      if (reportId) {
        await firestore().collection("admin")
          .doc("reports")
          .collection("reports")
          .doc(reportId)
          .delete();

        await firestore()
          .collection("users")
          .doc(userEmail)
          .collection("reports")
          .doc(reportId)
          .delete();
      }
      navigation.navigate("HomePage");
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <ImageBackground source={BgImage} style={styles.container}>
      {/* 🔙 Back button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHome}>
          <HomeIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View>
        <Image source={TopImage} resizeMode="contain" />
        <Text style={styles.title}>Xerostomia VAS</Text>
        <Text style={styles.subtitleI}>Rate Your Dry Mouth Intensity</Text>
      </View>

      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderValueText}>{sliderValue.toFixed(1)}</Text>

        <Slider
          value={sliderValue}
          onValueChange={(val: number | number[]) =>
            setSliderValue(Array.isArray(val) ? val[0] : val)
          }
          minimumValue={0}
          maximumValue={10}
          step={0.1}
          minimumTrackTintColor={getColor(sliderValue)}
          maximumTrackTintColor="#ccc"
          trackStyle={{ height: 12, borderRadius: 6 }}              // thicker line
          thumbStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: getColor(sliderValue),                 // colored knob
          }}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.sliderLabel1}>
            0{"\n"}no dry{"\n"}mouth at{"\n"}all
          </Text>
          <Text style={styles.sliderLabel2}>
            10{"\n"}complete{"\n"}dryness
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.okButton} onPress={handleNext}>
        <Text style={styles.okButtonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
