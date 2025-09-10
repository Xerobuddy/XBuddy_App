import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { loginStyles as styles } from './login.styles';

import SignupIcon from '../../../assets/images/illustrations/login_1.svg';
import GoogleIcon from '../../../assets/logos/google_colored.svg';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '516332872631-a4l2omdm2j8jmasf91udmieljnvgt6cd.apps.googleusercontent.com', // Replace with your Firebase web client ID
    });
  }, []);

  const validateEmail = (inputEmail: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);

  const handleLogin = async () => {
    if (!email.trim() || !validateEmail(email)) {
      return Alert.alert('Validation Error', 'Please enter a valid email');
    }
    if (!password.trim()) {
      return Alert.alert('Validation Error', 'Please enter your password');
    }

    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      Alert.alert('Success', `Welcome back, ${user.displayName || 'User'}!`);
      navigation.replace('HomePage');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.code === 'auth/user-not-found'
          ? 'No user found with this email.'
          : error.code === 'auth/wrong-password'
            ? 'Incorrect password.'
            : error.message || 'Something went wrong.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Force sign out so that account chooser shows every time
      await GoogleSignin.signOut();
      // OR await GoogleSignin.revokeAccess(); // if you also want to clear granted permissions

      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.data?.idToken;
      if (!idToken) throw new Error("Google Sign-In failed: No ID token received.");

      // Create Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      const userDoc = await firestore().collection("users").doc(user.email!).get();

      if (userDoc.exists()) {
        await firestore().collection("users").doc(user.email!).set(
          { lastLogin: firestore.FieldValue.serverTimestamp() },
          { merge: true }
        );
        Alert.alert("Welcome back", `${user.displayName || "User"}!`);
        navigation.replace("HomePage");
      } else {
        await firestore().collection("users").doc(user.email!).set({
          name: user.displayName,
          email: user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        navigation.replace("OnboardingScreen");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled Google sign-in");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Error", "Google Play Services not available.");
      } else {
        console.error("Google Sign-In Error:", error);
        Alert.alert("Google Sign-In Failed", error.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <ImageBackground
      source={require('../../../assets/images/background/bg_1.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        <SignupIcon height={180} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeSlashIcon size={20} color="#8359E3" />
            ) : (
              <EyeIcon size={20} color="#8359E3" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or Sign In with</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin} disabled={loading}>
          <GoogleIcon width={20} height={20} />
          <Text style={styles.googleButtonText}>Sign In with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.linkText}>Don&apos;t have an account?{" "}<Text style={styles.linkText2}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
