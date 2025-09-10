import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { productDetailStyles as styles } from "./productDetail.styles";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

interface Product {
  productID: string;
  productName: string;
  manufacturer: string;
  productDescription: string;
  imageUrl: string;
}

export default function ProductDetailScreen({ route, navigation }: any) {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product:", productId);

        const doc = await firestore().collection("products").doc(productId).get();

        if (doc.exists()) {
          setProduct(doc.data() as Product);
        } else {
          console.warn("No product found for ID:", productId);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_2.jpg")}
      style={styles.background}
    >
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{product.productName}</Text>
        <Text style={styles.manufacturer}>By {product.manufacturer}</Text>
        <Text style={styles.description}>{product.productDescription}</Text>

        {/* Format Section */}
        <View style={styles.formatSection}>
          <Text style={styles.formatTitle}>Format</Text>
          <View style={styles.formatList}>
            <Text style={styles.formatItem}>5x5cm</Text>
            <Text style={styles.formatItem}>PZN 01675562</Text>
            <Text style={styles.formatItem}>10x10cm</Text>
            <Text style={styles.formatItem}>PZN 01675563</Text>
            <Text style={styles.formatItem}>20x20cm</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
