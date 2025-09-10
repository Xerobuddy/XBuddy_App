import React from "react";
import { View, Text, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./professionSelection.styles";
import { auth, firestore } from "../../../utils/firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";

type ProfessionScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "ProfessionScreen"
>;

export default function ProfessionSelectionScreen() {
  const navigation = useNavigation<ProfessionScreenNavProp>();

  const handleSelection = async (type: "Professional" | "Patient") => {
    const user = auth().currentUser;

    if (!user || !user.email) {
      Alert.alert("Error", "No user logged in.");
      return;
    }

    try {
      // ✅ Store profession in Firestore
      await firestore()
        .collection("users")
        .doc(user.email)
        .update({ profession: type });

      if (type === "Professional") {
        navigation.navigate("ProfessionVerificationScreen");
      } else {
        navigation.navigate("HomePage");
      }
    } catch (error) {
      Alert.alert("Error", "Could not update profession.");
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_1.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Profession</Text>
        <Text style={styles.subtitle}>Are you a Patient or a Healthcare Professional?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelection("Patient")}
        >
          <Text style={styles.buttonText}>Patient</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Are you a Patient or a Healthcare Professional?</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelection("Professional")}
        >
          <Text style={styles.buttonText}>Professional</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
