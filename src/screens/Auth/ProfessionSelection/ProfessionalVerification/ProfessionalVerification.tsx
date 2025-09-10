import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import styles from "./professionalverification.styles";

export default function ProfessionVerification() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  const requestPermissionAndPickImage = async () => {
    try {
      const permission =
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.IOS.PHOTO_LIBRARY;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        pickImage();
      } else {
        Alert.alert(
          "Permission Required",
          "Please allow photo library access to upload your ID."
        );
      }
    } catch (error) {
      console.error("Permission Error:", error);
      Alert.alert("Error", "Failed to request permissions.");
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
      });

      if (result.didCancel) return;

      if (result.errorCode) {
        Alert.alert("Error", result.errorMessage || "Image picker error");
        return;
      }

      if (result.assets?.length) {
        setSelectedImage(result.assets[0].uri || null);
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
      Alert.alert("Error", "Failed to open image picker.");
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert("Please select an image first");
      return;
    }

    try {
      setUploading(true);
      const user = auth().currentUser;

      if (!user || !user.uid) {
        Alert.alert("Error", "No user logged in");
        return;
      }

      // Read image as base64
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64data = (reader.result as string).split(",")[1];

          const formData = new FormData();
          formData.append("image", base64data);

          // Upload to ImgBB
          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=09fe9883bb412b16bd71f24ff324b9be`,
            {
              method: "POST",
              body: formData,
            }
          );

          const json = await res.json();
          if (!json.success) {
            throw new Error("ImgBB upload failed");
          }

          const imageUrl = json.data.url;

          // Save in Firestore
          await firestore().collection("users").doc(user.email!).set(
            {
              profession: "Professional",
              professionVerificationImage: imageUrl,
              professionVerificationStatus: "pending",
            },
            { merge: true }
          );

          Alert.alert("Success", "Your ID has been submitted for verification.");
          navigation.reset({
            index: 0,
            routes: [{ name: "HomePage" as never }],
          });
        } catch (err) {
          console.error("Upload error:", err);
          Alert.alert("Error", "Something went wrong while uploading");
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error preparing upload:", error);
      Alert.alert("Something went wrong while preparing the image");
      setUploading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/background/bg_1.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.subtitle}>I need to verify your status as a medical professional so you can share patient records with your colleagues. To chat with your colleagues and share patient files, we need to verify that you are a medical professional.</Text>
        <Text style={styles.subtitle}>I will ask you to take a photo of your professional ID (or diploma) and your identity card (or passport).</Text>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        )}

        <TouchableOpacity
          style={styles.pickButton}
          onPress={requestPermissionAndPickImage}
        >
          <Text style={styles.pickButtonText}>
            {selectedImage ? "Change Image" : "Confirm my Identity"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadButton, uploading && { backgroundColor: "#999" }]}
          onPress={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.uploadButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
