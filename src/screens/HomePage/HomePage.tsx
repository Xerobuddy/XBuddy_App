import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homePageStyles as styles } from "./homePage.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ArrowRightOnRectangleIcon } from "react-native-heroicons/solid";

import TopImage from "../../assets/images/illustrations/waterDrop_hi.png";
import BannerPng from "../../assets/images/illustrations/notepad1.png";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

type HomePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomePage"
>;

type Report = {
  id: string;
  assessmentName: string;
  createdAt: any;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomePageNavigationProp>();
  const [username, setUsername] = useState<string>("User");
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUsername(currentUser.displayName || currentUser.email || "User");

      // 🔥 Fetch reports for this user
      const unsubscribe = firestore()
        .collection("users")
        .doc(currentUser.email!)
        .collection("reports")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const fetchedReports: Report[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            assessmentName: doc.data().assessmentName || "Unknown",
            createdAt: doc.data().createdAt,
          }));
          setReports(fetchedReports);
        });

      return () => unsubscribe();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredReports = reports.filter((r) =>
    r.assessmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={require("../../assets/images/background/bg_2.jpg")}
      style={styles.container}
    >
      {/* Logout Icon Top Right */}
      <View style={styles.logoutIconContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <ArrowRightOnRectangleIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <View style={styles.contentContainer}>
        {/* Top Illustration */}
        <View style={styles.topIllustration}>
          <Image source={TopImage} resizeMode="contain" />
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Hello, {username}</Text>

        {/* Banner Button */}
        <TouchableOpacity
          style={styles.bannerButton}
          onPress={() => navigation.navigate("PatientDetail")}
        >
          <Text style={styles.bannerText}>Start Salivary Assessment</Text>
          <Image
            source={BannerPng}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Search */}
        <View style={styles.reportsContainer}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for Reports..."
              placeholderTextColor="#fff"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Reports List */}
          <FlatList
            data={filteredReports}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }} // 👈 keeps message centered
            style={{ flexGrow: 0, maxHeight: 400 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.reportId}>{item.id}</Text>
                  <Text style={styles.assessmentName}>{item.assessmentName}</Text>
                  <Text style={styles.createdAt}>
                    {item.createdAt ? item.createdAt.toDate().toLocaleDateString() : "N/A"}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    navigation.navigate("ReportSummary", { reportId: item.id })
                  }
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, minHeight: 200 }}>
                <Text style={{ fontSize: 16, color: "gray" }}>No reports found</Text>
              </View>
            }
          />

        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </ImageBackground>
  );
};

export default HomeScreen;
