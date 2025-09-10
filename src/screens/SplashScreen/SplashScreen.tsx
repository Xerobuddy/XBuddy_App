import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { splashScreenStyles as styles } from './splashScreen.styles';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity starts at 0
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // slightly smaller

  useEffect(() => {
    // Run fade + scale animation in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const checkAppState = async () => {
      try {
        const currentUser = auth().currentUser;

        setTimeout(() => {
          if (currentUser) {
            navigation.replace('HomePage');
          } else {
            navigation.replace('LoginScreen'); // always go to login if no user
          }
        }, 2000);
      } catch (error) {
        console.error('Splash check error:', error);
        setTimeout(() => navigation.replace('LoginScreen'), 2000);
      }
    };
    checkAppState();
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <ImageBackground
      source={require('../../assets/images/background/bg_1.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.Image
        source={require('../../assets/logos/App_Logo.png')}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.logoText, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>Xerobuddy</Animated.Text>
    </ImageBackground>
  );
};

export default SplashScreen;
