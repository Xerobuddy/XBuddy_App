// XerostomiaQuestionScreen.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ImageBackground, View, Image, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { HomeIcon } from "react-native-heroicons/outline";
import BgImage from "../../../assets/images/background/bg_2.jpg";
import { xerostomiaStyles as styles } from "./xerostomia.styles";

type QuestionType = {
  id: string;
  question: string;
  imageUrl?: string;
};

export default function XerostomiaQuestionScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { questionNumber, reportId } = route.params;

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch questions from Firestore (collection: xerostomia)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const snapshot = await firestore()
          .collection("xerostomia")
          .orderBy("ord", "asc") // 👈 ensures consistent order
          .get();

        const qList: QuestionType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as QuestionType[];

        setQuestions(qList);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <ImageBackground source={BgImage} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </ImageBackground>
    );
  }

  const questionItem = questions[questionNumber - 1];
  if (!questionItem) {
    return (
      <ImageBackground source={BgImage} style={styles.container}>
        <Text style={styles.question}>No question found</Text>
      </ImageBackground>
    );
  }

  const handleAnswer = async (answer: string) => {
    const userEmail = auth().currentUser?.email;
    if (!userEmail) return;

    try {
      // save to user reports
      await firestore()
        .collection("users")
        .doc(userEmail)
        .collection("reports")
        .doc(reportId)
        .collection("xerostomia")
        .doc(`q${questionNumber}`)
        .set({ question: questionItem.question, answer });

      // save to admin reports
      await firestore()
        .collection("admin")
        .doc("reports")
        .collection("reports")
        .doc(reportId)
        .collection("xerostomia")
        .doc(`q${questionNumber}`)
        .set({ question: questionItem.question, answer });

      if (questionNumber < questions.length) {
        navigation.push("XerostomiaQuestion", {
          questionNumber: questionNumber + 1,
          reportId,
        });
      } else {
        navigation.navigate("XerostomiaInfo", { reportId });
      }
    } catch (err) {
      console.error("Error saving answer:", err);
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

      {/* 🖼️ Question Image */}
      {questionItem.imageUrl ? (
        <Image
          source={{ uri: questionItem.imageUrl }}
          style={styles.questionImage}
          resizeMode="contain"
        />
      ) : null}

      {/* ❓ Question Text */}
      <Text style={styles.question}>"{questionItem.question}"</Text>

      {/* Options */}
      {["Never", "Occasionally", "Often"].map((opt) => (
        <TouchableOpacity
          key={opt}
          style={styles.optionButton}
          onPress={() => handleAnswer(opt)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </ImageBackground>
  );
}
