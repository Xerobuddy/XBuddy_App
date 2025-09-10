import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { patientDetailStyle as styles } from "./patientDetail.styles";

// Type navigation for TS
type PatientDetailNavigationProp = StackNavigationProp<
    RootStackParamList,
    "PatientDetail"
>;

export default function PatientDetail() {
    const navigation = useNavigation<PatientDetailNavigationProp>();

    const [assessmentName, setAssessmentName] = useState("");
    const [gender, setGender] = useState<"Male" | "Female" | "Other" | "">("");
    const [age, setAge] = useState("");
    const [numDrugs, setNumDrugs] = useState("");

    const handleNext = async () => {
        try {
            const userEmail = auth().currentUser?.email;
            if (!userEmail) return;

            if (!assessmentName.trim()) {
                console.warn("Assessment name required");
                return;
            }

            // Generate REP_##### id
            const makeId = () =>
                `REP_${Math.floor(10000 + Math.random() * 90000)}`;

            const reportId = makeId();

            const reportData = {
                reportId,
                assessmentName: assessmentName.trim(),
                gender,
                age: Number(age),
                numDrugs: Number(numDrugs),
                userEmail,
                createdAt: firestore.FieldValue.serverTimestamp(),
            };

            // Save under user
            await firestore()
                .collection("users")
                .doc(userEmail)
                .collection("reports")
                .doc(reportId)
                .set(reportData);

            // Mirror to admin
            await firestore()
                .collection("admin")
                .doc("reports")
                .collection("reports")
                .doc(reportId)
                .set(reportData);

            // Navigate to Xerostomia screen with reportId
            navigation.navigate("XerostomiaScreen", { reportId });
        } catch (error) {
            console.error("Error creating report:", error);
        }
    };

    return (
        <ImageBackground
            source={require("../../../assets/images/background/bg_2.jpg")}
            style={styles.bgContainer}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Assessment Details</Text>

                <Image
                    source={require("../../../assets/images/illustrations/seniors.png")}
                    style={styles.image}
                />

                {/* Assessment Name */}
                <Text style={styles.label}>Assessment Name</Text>
                <TextInput
                    placeholder="Enter Assessment Name"
                    value={assessmentName}
                    onChangeText={setAssessmentName}
                    style={styles.input}
                />

                {/* Gender */}
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderContainer}>
                    {["Male", "Female", "Other"].map((g) => (
                        <TouchableOpacity
                            key={g}
                            style={[
                                styles.genderButton,
                                gender === g && styles.genderButtonSelected,
                            ]}
                            onPress={() => setGender(g as any)}
                        >
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === g && styles.genderTextSelected,
                                ]}
                            >
                                {g}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Age */}
                <Text style={styles.label}>Age</Text>
                <TextInput
                    placeholder="Enter Age"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                    style={styles.input}
                />

                {/* Number of Drugs */}
                <Text style={styles.label}>Number of Drugs</Text>
                <TextInput
                    placeholder="Enter Number of Drugs"
                    keyboardType="numeric"
                    value={numDrugs}
                    onChangeText={setNumDrugs}
                    style={styles.input}
                />

                {/* Next Button */}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}
