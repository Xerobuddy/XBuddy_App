import React, { useState } from "react";
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import { ArrowLeftIcon, QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { usfrStyles as styles } from "./usfr.styles";

export default function USFRScreen({ route, navigation }: any) {
  const { reportId } = route.params;
  const [measurement, setMeasurement] = useState("");

  const userEmail = auth().currentUser?.email;

  const saveUSFR = async () => {
    if (!measurement || isNaN(Number(measurement))) {
      Alert.alert("Invalid Input", "Please enter a valid numeric value for USFR.");
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
        .update({ usfr: Number(measurement) });

      // Save under admin's collection
      await firestore()
        .collection("admin")
        .doc("reports")
        .collection("reports")
        .doc(reportId)
        .update({ usfr: Number(measurement) });

      return true;
    } catch (err) {
      console.error("Error saving USFR:", err);
      Alert.alert("Error", "Failed to save measurement. Please try again.");
      return false;
    }
  };

  const handleNavigate = async (screen: string) => {
    const success = await saveUSFR();
    if (success) {
      navigation.navigate(screen, { reportId });
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
        <Text style={styles.titleText}>USFR</Text>
        <Text style={styles.subtitleText}>Unstimulated Salivary Flow Rate</Text>
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
          onPress={() => handleNavigate("ReportSummary")}
        >
          <Text style={styles.filledButtonText}>Save & Go to Report</Text>
        </TouchableOpacity>

        {/* Outline Button */}
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => handleNavigate("SFRScreen")}
        >
          <Text style={styles.outlineButtonText}>SFR Test</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
