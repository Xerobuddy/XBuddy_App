import React, { useRef, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import styles from "./aboutScreen.styles";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../../assets/images/illustrations/waterDrop_hi.png"),
    title: "Welcome to your personal saliva assistant!",
    subtitle: "Precise, Fast and always available",
    buttonText: "Great",
  },
  {
    id: "2",
    image: require("../../../assets/images/illustrations/waterDrop_hi2.png"),
    title: "Get started straight away!",
    subtitle:
      "No complicated instructions, no waiting times - quickly and easily identify your risk of dry mouth.",
    buttonText: "Interesting",
  },
  {
    id: "3",
    image: require("../../../assets/images/illustrations/waterDrop_hi3.png"),
    title: "Discover Personalised Solutions",
    subtitle: "Based on Your Salivary Parameters to combat dry mouth!",
    buttonText: "Alright",
  },
];

export default function AboutXerobuddyScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("SettingScreen" as never);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_1.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* FlatList for slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slideContainer}>
            <Image source={item.image} style={styles.slideImage} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>

            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>{item.buttonText}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </ImageBackground>
  );
}
