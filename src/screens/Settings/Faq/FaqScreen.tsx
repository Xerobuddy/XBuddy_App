import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from "react-native";
import { ArrowLeftIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import firestore from "@react-native-firebase/firestore";
import RenderHTML from "react-native-render-html";
import styles from "./faqScreen.styles";

// 👇 enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FAQType = {
  id: string;
  question: string;
  answer: string; // stored in Firestore as HTML string
};

const FAQScreen = ({ navigation }: any) => {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const screenWidth = Dimensions.get("window").width;

  // 🔥 Fetch FAQs from Firestore
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const snapshot = await firestore().collection("faq").get();
        const faqList: FAQType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FAQType[];
        setFaqs(faqList);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFAQs();
  }, []);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_2.jpg")}
      style={styles.background}
    >
      {/* Top bar with Back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>FAQs</Text>
      </View>

      {/* FAQ List */}
      <FlatList
        data={faqs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedId === item.id;
          return (
            <View style={{ marginBottom: 6 }}>
              {/* Question Card */}
              <TouchableOpacity
                onPress={() => toggleExpand(item.id)}
                style={styles.card}
              >
                <Text style={styles.question}>{item.question}</Text>
                <ChevronRightIcon />
              </TouchableOpacity>

              {/* Answer in a separate container */}
              {isExpanded && (
                <View style={styles.answerCard}>
                  <RenderHTML
                    contentWidth={screenWidth - 40}
                    source={{ html: item.answer }}
                    baseStyle={{ color: "#333", fontSize: 14 }}
                    tagsStyles={{
                      h1: {
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 10,
                        color: "inherit",
                      },
                      p: {
                        fontSize: 14,
                        fontWeight: "400",
                        color: "inherit",
                      },
                      strong: {
                        fontWeight: "bold",
                      },
                      ol: {
                        marginLeft: 8,
                        color: "inherit",
                      },
                      li: {
                        marginBottom: 6,
                        color: "inherit",
                      },
                    }}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalGhostLinesPrevention={true}
                  />
                </View>
              )}
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </ImageBackground>
  );
};

export default FAQScreen;
