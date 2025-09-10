import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { productsScreenStyles as styles } from "./productsScreen.styles";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

// heroicons
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  BeakerIcon,
  SparklesIcon,
  CubeTransparentIcon,
  BeakerIcon as RinseIcon,
} from "react-native-heroicons/outline";
import { RootStackParamList } from "../../navigation/AppNavigator";

interface Product {
  id: string;
  productID: string;
  productName: string;
  acbScore: number;
  category: string;
  imageUrl: string;
  manufacturer: string;
  productDescription: string;
  status: string;
}

const categories = [
  { name: "All", icon: SparklesIcon },
  { name: "Dry Mouth", icon: BeakerIcon },
  { name: "Toothpaste", icon: CubeTransparentIcon },
  { name: "Toothbrushes", icon: SparklesIcon },
  { name: "Mouth Rinses", icon: RinseIcon },
];

export default function ProductsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("products")
      .limit(20)
      .onSnapshot(
        (querySnapshot) => {
          const fetched: Product[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Product, "id">),
          }));
          setProducts(fetched);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.productName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = ({ item }: { item: Product }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("ProductDetailsScreen", { productId: item.productID })}
  >
    <View style={styles.imageContainer}>
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onError={(e) =>
            console.log("Image load error:", e.nativeEvent.error)
          }
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
    </View>

    <Text style={styles.name}>{item.productName}</Text>
    <Text style={styles.manufacturer}>Manufacturer: {item.manufacturer}</Text>
  </TouchableOpacity>
);

  return (
    <ImageBackground
      source={require("../../assets/images/background/bg_1.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
          placeholderTextColor="#777"
        />

        {/* Category Filter - Scrollable */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.categoryButton,
                  isActive && styles.activeCategoryButton,
                ]}
                onPress={() => setSelectedCategory(cat.name)}
              >
                <Icon
                  size={18}
                  color={isActive ? "#fff" : "#000"}
                  style={styles.categoryIcon}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.activeCategoryText,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Products List */}
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContainer}
          />
        )}

        <BottomNavbar />
      </SafeAreaView>
    </ImageBackground>
  );
}
