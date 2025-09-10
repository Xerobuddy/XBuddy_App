import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Linking, ActivityIndicator } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import styles from "./factDetail.styles";
import firestore from "@react-native-firebase/firestore";

interface SalivaFact {
    id: string;
    title: string;
    description: string;
    source: string;
}

export default function FactDetailScreen({ route, navigation }: any) {
    const { factId } = route.params;
    const [fact, setFact] = useState<SalivaFact | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFacts = async () => {
            try {
                const doc = await firestore().collection("salivaFacts").doc(factId).get();

                if (doc.exists()) {
                    setFact(doc.data() as SalivaFact);
                } else {
                    console.warn("No fact found for ID:", factId);
                }
            } catch (error) {
                console.error("Error fetching saliva facts: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFacts();
    }, [factId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!fact) {
        return (
            <View style={styles.center}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require("../../../assets/images/background/bg_1.jpg")}
            style={styles.background}
        >
            {/* Top bar with Back button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeftIcon size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Saliva Facts</Text>
            </View>

            {/* Content */}
            <View style={styles.container}>
                <Text style={styles.title}>{fact.title}</Text>
                <Text style={styles.description}>{fact.description}</Text>

                <TouchableOpacity onPress={() => Linking.openURL(fact.source)}>
                    <Text style={styles.source}>Read more</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};
