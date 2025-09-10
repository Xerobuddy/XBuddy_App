import React, { useState } from "react";
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import { ArrowLeftIcon, QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { sfrStyles as styles } from "./sfrStyles.style";

export default function SFRScreen({ route, navigation }: any) {
  const { reportId } = route.params;
  const [measurement, setMeasurement] = useState("");

  const userEmail = auth().currentUser?.email;

  const saveSFR = async () => {
    if (!measurement || isNaN(Number(measurement))) {
      Alert.alert("Invalid Input", "Please enter a valid numeric value for SFR.");
      return false;
    }

    try {
      if (!userEmail) return false;

      // Save under user's collection
      await firestore()
        .collection("users")
        .doc(userEmail)
        .collection("reports")
        .doc(reportId)
        .update({ sfr: Number(measurement) });

      // Save under admin's collection
      await firestore()
        .collection("admin")
        .doc("reports")
        .collection("reports")
        .doc(reportId)
        .update({ sfr: Number(measurement) });

      return true;
    } catch (err) {
      console.error("Error saving SFR:", err);
      Alert.alert("Error", "Failed to save measurement. Please try again.");
      return false;
    }
  };

  const handleNavigate = async () => {
    const success = await saveSFR();
    if (success) {
      navigation.navigate("ReportSummary", { reportId });
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/background/bg_2.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tutorial Button */}
      <TouchableOpacity onPress={() => navigation.navigate("TutorialScreen")} style={styles.roundButton}>
        <QuestionMarkCircleIcon size={22} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>SFR</Text>
        <Text style={styles.subtitleText}>Stimulated Salivary Flow Rate</Text>
      </View>

      {/* Input Area */}
      <View style={styles.inputAreaContainer}>
        <Text style={styles.inputTitle}>Measurement Result</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter value"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={measurement}
            onChangeText={setMeasurement}
          />
          <Text style={styles.unitText}>ml/min</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {/* Filled Button */}
        <TouchableOpacity
          style={styles.filledButton}
          onPress={handleNavigate}
        >
          <Text style={styles.filledButtonText}>Save & Go to Report</Text>
        </TouchableOpacity>

        {/* Outline Button */}
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate("SchirmerTestScreen", { reportId })}
        >
          <Text style={styles.outlineButtonText}>Schirmer Test</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
