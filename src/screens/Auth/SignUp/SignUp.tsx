import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { signupStyles as styles } from './signup.styles';

// import SignupIcon from '../../../assets/images/illustrations/login_1.svg';
import GoogleIcon from '../../../assets/logos/google_colored.svg';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

// Firebase & Google Sign-In
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type SignupNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;

const Signup: React.FC = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Configure Google Sign-In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '516332872631-a4l2omdm2j8jmasf91udmieljnvgt6cd.apps.googleusercontent.com', // Replace with your actual web client ID from Firebase console
    });
  }, []);

  const validateEmail = (inputEmail: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);

  const validatePassword = (inputPassword: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputPassword);

  const handleSignup = async () => {
    if (!name.trim()) return Alert.alert('Validation Error', 'Please enter your name');
    if (!email.trim() || !validateEmail(email))
      return Alert.alert('Validation Error', 'Please enter a valid email');
    if (!password || !validatePassword(password))
      return Alert.alert(
        'Validation Error',
        'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.'
      );
    if (password !== confirmPassword)
      return Alert.alert('Validation Error', 'Passwords do not match!');

    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await user.updateProfile({ displayName: name });

      await firestore().collection('users').doc(user.email!).set({
        name,
        age,
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('OnboardingScreen');
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult?.data?.idToken;

      if (!idToken) throw new Error('Google Sign-Up failed: No ID token received.');

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      await firestore().collection('users').doc(user.email!).set(
        {
          name: user.displayName,
          email: user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      Alert.alert('Success', 'Signed Up with Google!');
      navigation.replace('OnboardingScreen');
    } catch (error: any) {
      console.error('Google Sign-Up Error:', error);
      Alert.alert('Google Sign-Up Failed', error.message || 'Something went wrong.');
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
        {/* <SignupIcon height={180} style={styles.logo} /> */}
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#ccc"
          value={age}
          onChangeText={setAge}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Field */}
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

        {/* Confirm Password Field */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <EyeSlashIcon size={20} color="#8359E3" />
            ) : (
              <EyeIcon size={20} color="#8359E3" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or Sign Up with</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup} disabled={loading}>
          <GoogleIcon width={20} height={20} />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linkText}>Already have an account?{" "}<Text style={styles.linkText2}>Sign In</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Signup;
