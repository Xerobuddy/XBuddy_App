import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { saliveFactsStyle as styles } from "./salivaFacts.styles"; 
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { NavigationProp, useNavigation } from "@react-navigation/native"; // ✅ import
import { RootStackParamList } from "../../navigation/AppNavigator";

interface SalivaFact {
  id: string;        
  title: string;
  description: string;
  source: string;
}

const SalivaFactsScreen = () => {
  const [facts, setFacts] = useState<SalivaFact[]>([]);
  const [filteredFacts, setFilteredFacts] = useState<SalivaFact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const snapshot = await firestore().collection("salivaFacts").get();
        const data: SalivaFact[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          source: doc.data().source,
        }));
        setFacts(data);
        setFilteredFacts(data);
      } catch (error) {
        console.error("Error fetching saliva facts: ", error);
      }
    };

    fetchFacts();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredFacts(facts);
    } else {
      setFilteredFacts(
        facts.filter((fact) =>
          fact.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const renderItem = ({ item }: { item: SalivaFact }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("FactDetailScreen", { factId: item.id })}
  >
    <Text style={styles.cardText}>{item.title}</Text>
    <ChevronRightIcon size={20} color="#161d1f" />
  </TouchableOpacity>
);

  return (
    <ImageBackground
      source={require("../../assets/images/background/bg_1.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>What are you interested in?</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search facts..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Facts List */}
        <FlatList
          data={filteredFacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
      <BottomNavbar />
    </ImageBackground>
  );
};

export default SalivaFactsScreen;
