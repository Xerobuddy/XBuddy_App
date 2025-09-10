import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onboardingStyles as styles } from './onboarding.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen'>;

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to your personal saliva assessment',
    description: 'Precise, fast and always available',
    image: require('../../assets/images/illustrations/waterDrop_hi.png'),
  },
  {
    id: '2',
    title: 'Get started straight away!',
    description: 'No complicated instructions, no waiting times - quickly and easily identify your risk of dry mouth',
    image: require('../../assets/images/illustrations/waterDrop_hi2.png'),
  },
  {
    id: '3',
    title: 'Discover Personalised Solutions',
    description: 'Based on Your Salivary Parameters to Combat Dry Mouth!',
    image: require('../../assets/images/illustrations/waterDrop_hi3.png'),
  },
];

const Onboarding: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      navigation.replace('ProfessionScreen'); // Navigate to Home after last slide
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background/bg_1.jpg')} // same as splash
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map((item) => (
          <View style={styles.slide} key={item.id}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;
