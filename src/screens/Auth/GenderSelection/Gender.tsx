import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import styles from './gender.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { UserIcon, UserGroupIcon } from 'react-native-heroicons/outline';
import { auth, firestore } from '../../../utils/firebaseConfig';

type GenderType = 'male' | 'female';

type GenderSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GenderScreen'
>;

const GenderSelectionScreen: React.FC = () => {
  const navigation = useNavigation<GenderSelectionScreenNavigationProp>();
  const [selectedGender, setSelectedGender] = useState<GenderType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (gender: GenderType) => {
    setSelectedGender(gender);
  };

  const handleContinue = async () => {
    if (!selectedGender) return;

    const user = auth().currentUser;
    if (!user || !user.email) {
      Alert.alert('Error', 'No user logged in.');
      return;
    }

    setLoading(true);
    try {
      await firestore()
        .collection('users')
        .doc(user.email)
        .update({
          gender: selectedGender,
        });

      navigation.navigate('ProfessionScreen');
    } catch (error: any) {
      console.error('Error updating gender:', error);
      Alert.alert('Error', error.message || 'Failed to save gender.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/bg_1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Select Your Gender</Text>

        <View style={styles.optionContainer}>
          {/* Male Option */}
          <TouchableOpacity
            style={[styles.option, selectedGender === 'male' && styles.selectedOption]}
            onPress={() => handleSelect('male')}
          >
            <UserIcon size={26} color={selectedGender === 'male' ? '#4CAF50' : '#555'} />
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>

          {/* Female Option */}
          <TouchableOpacity
            style={[styles.option, selectedGender === 'female' && styles.selectedOption]}
            onPress={() => handleSelect('female')}
          >
            <UserGroupIcon size={26} color={selectedGender === 'female' ? '#4CAF50' : '#555'} />
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.continueBtn, !selectedGender && styles.disabledBtn]}
          onPress={handleContinue}
          disabled={!selectedGender || loading}
        >
          <Text style={styles.continueText}>
            {loading ? 'Saving...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default GenderSelectionScreen;
