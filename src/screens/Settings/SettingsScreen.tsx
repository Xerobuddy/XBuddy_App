import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
    QuestionMarkCircleIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    ArrowRightOnRectangleIcon,
    InformationCircleIcon,
} from "react-native-heroicons/outline";
import styles from "./settingScreen.styles";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type SettingNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SettingScreen"
>;

export default function SettingsScreen() {
    const navigation = useNavigation<SettingNavigationProp>();
    const [user, setUser] = useState<{ displayName: string; email: string; profession: string } | null>(null);

    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            firestore()
                .collection("users")
                .doc(currentUser.email!)
                .get()
                .then((doc) => {
                    const data = doc.data();
                    setUser({
                        displayName: data?.name || "Guest",
                        email: data?.email || "Not set",
                        profession: data?.profession || "Not set",
                    });
                });
        }
    }, []);

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" as never }],
            });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/background/bg_2.jpg")}
            style={styles.background}
        >
            <View style={styles.container}>
                {/* About You */}
                <Text style={styles.sectionTitle}>About You</Text>
                <View style={styles.card}>
                    {/* <UserIcon size={28} color="black" /> */}
                    <View style={styles.textContainer}>
                        <Text style={styles.username}>{user?.displayName}</Text>
                        <Text style={styles.profession}>{user?.profession}</Text>
                        <Text style={styles.profession}>{user?.email}</Text>
                    </View>
                </View>

                {/* App Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Settings</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("AboutScreen" as never)}
                    >
                        <InformationCircleIcon size={22} color="black" />
                        <Text style={styles.buttonText}>About XeroBuddy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("FaqScreen" as never)}
                    >
                        <QuestionMarkCircleIcon size={22} color="black" />
                        <Text style={styles.buttonText}>FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("TermAndConditionScreen" as never)}
                    >
                        <DocumentTextIcon size={22} color="black" />
                        <Text style={styles.buttonText}>Terms & Conditions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("LanguageScreen" as never)}
                    >
                        <GlobeAltIcon size={22} color="black" />
                        <Text style={styles.buttonText}>Select Language</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.logoutButton]}
                        onPress={handleLogout}
                    >
                        <ArrowRightOnRectangleIcon size={22} color="red" />
                        <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Navbar */}
            <BottomNavbar />
        </ImageBackground>
    );
}
