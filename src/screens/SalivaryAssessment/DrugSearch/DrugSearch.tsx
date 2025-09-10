import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { drugSearchStyles } from "./drugSearch.styles";
import { PlusIcon } from "react-native-heroicons/outline";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

interface Product {
  id: string;
  productName: string;
  acbScore: number;
}

export default function DrugSearchScreen({ route, navigation }: any) {
  const { reportId } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [numDrugsRequired, setNumDrugsRequired] = useState<number>(0);
  const [selectedDrugs, setSelectedDrugs] = useState<Product[]>([]);

  const userEmail = auth().currentUser?.email;

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnap = await firestore().collection("products").get();
        const list: Product[] = [];
        querySnap.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            productName: data.productName,
            acbScore: data.acbScore,
          });
        });
        setProducts(list);
        setFiltered(list);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Fetch report details (numDrugsRequired + existing drugs)
  useEffect(() => {
    if (!userEmail) return;

    const unsubscribe = firestore()
      .collection("users")
      .doc(userEmail)
      .collection("reports")
      .doc(reportId)
      .onSnapshot((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setNumDrugsRequired(Number(data?.numDrugs) || 0);
          setSelectedDrugs(data?.drugs || []);
        }
      });

    return () => unsubscribe();
  }, [userEmail, reportId]);

  // Search filter
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((p) =>
          p.productName.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  // Add product to report (patient side + admin side)
  const handleAddProduct = async (product: Product) => {
    try {
      if (!userEmail) return;

      // Check if the limit is reached
      if (selectedDrugs.length >= numDrugsRequired) {
        Alert.alert(
          "Limit reached",
          `You have already added the required number of drugs (${numDrugsRequired}).`
        );
        return;
      }

      // patient report
      await firestore()
        .collection("users")
        .doc(userEmail)
        .collection("reports")
        .doc(reportId)
        .update({ drugs: firestore.FieldValue.arrayUnion(product) });

      // admin report
      await firestore()
        .collection("admin")
        .doc("reports")
        .collection("reports")
        .doc(reportId)
        .update({ drugs: firestore.FieldValue.arrayUnion(product) });

      Alert.alert("Success", `${product.productName} has been added to the report.`);
    } catch (err) {
      Alert.alert("Error", "Failed to add product. Please try again.");
      console.error("Error adding product:", err);
    }
  };

  const renderItem = ({ item }: { item: Product }) => {
    const isDisabled = selectedDrugs.length >= numDrugsRequired;

    return (
      <View style={drugSearchStyles.productItem}>
        <View>
          <Text style={drugSearchStyles.productName}>{item.productName}</Text>
          <Text style={drugSearchStyles.productScore}>
            ACB Score: {item.acbScore}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAddProduct(item)}
          style={[
            drugSearchStyles.addButton,
            isDisabled && { backgroundColor: "#888" }, // greyed out
          ]}
          disabled={isDisabled}
        >
          <PlusIcon size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  // Condition for button
  const isComplete = selectedDrugs.length === numDrugsRequired;

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_2.jpg")}
      style={drugSearchStyles.container}
      resizeMode="cover"
    >
      {/* Back button */}
      <View style={drugSearchStyles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={drugSearchStyles.header}>
        <Image
          source={require("../../../assets/images/illustrations/pills_1.png")}
          style={{ width: 48, height: 48, marginRight: 8 }}
          resizeMode="contain"
        />
        <Text style={drugSearchStyles.title}>Drug Search</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={drugSearchStyles.searchInput}
        placeholder="Search drugs..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Product List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={drugSearchStyles.list}
      />

      {/* Next/Add button */}
      <TouchableOpacity
        style={[
          drugSearchStyles.nextButton,
          !isComplete && { backgroundColor: "#989898" },
        ]}
        onPress={() =>
          isComplete
            ? navigation.navigate("AcbScoreScreen", { reportId })
            : Alert.alert("Incomplete", "Please add all required drugs.")
        }
      >
        <Text style={drugSearchStyles.nextButtonText}>
          {isComplete ? "Next" : "Add Item"}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
