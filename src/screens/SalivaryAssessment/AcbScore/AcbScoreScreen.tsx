import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { acbScoreStyles } from "./acbScoreScreen.styles";
import GaugeChart from "../../../components/GuageChart";

// heroicons
import { ArrowLeftIcon, TrashIcon } from "react-native-heroicons/outline";

interface Product {
    id: string;
    productName: string;
    acbScore: number;
}

export default function AcbScoreScreen({ route, navigation }: any) {
    const { reportId } = route.params;
    const [drugs, setDrugs] = useState<Product[]>([]);
    const [totalScore, setTotalScore] = useState(0);
    const [profession, setProfession] = useState<string>("");

    useEffect(() => {
        const fetchReportAndUser = async () => {
            try {
                const userEmail = auth().currentUser?.email;
                if (!userEmail) return;

                // Fetch user profession
                const userSnap = await firestore().collection("users").doc(userEmail).get();
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setProfession(userData?.profession || "");
                }

                // Fetch drugs from report
                const docSnap = await firestore()
                    .collection("users")
                    .doc(userEmail)
                    .collection("reports")
                    .doc(reportId)
                    .get();

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const drugList: Product[] = data?.drugs || [];
                    setDrugs(drugList);

                    const score = drugList.reduce((sum, d) => sum + (d.acbScore || 0), 0);
                    setTotalScore(score);
                }
            } catch (err) {
                console.error("Error fetching report:", err);
            }
        };
        fetchReportAndUser();
    }, [reportId]);

    const handleNext = () => {
        if (profession === "patient") {
            navigation.navigate("ReportSummary", { reportId });
        } else {
            navigation.navigate("AdvancedDiagnostics", { reportId });
        }
    };

    const handleDeleteDrug = async (drugId: string) => {
        try {
            const userEmail = auth().currentUser?.email;
            if (!userEmail) return;

            const updatedDrugs = drugs.filter((d) => d.id !== drugId);
            setDrugs(updatedDrugs);

            const score = updatedDrugs.reduce((sum, d) => sum + (d.acbScore || 0), 0);
            setTotalScore(score);

            await firestore()
                .collection("users")
                .doc(userEmail)
                .collection("reports")
                .doc(reportId)
                .update({ drugs: updatedDrugs });

            await firestore().collection("reports").doc(reportId).update({
                drugs: updatedDrugs,
            });
        } catch (err) {
            console.error("Error deleting drug:", err);
        }
    };

    return (
        <ImageBackground
            source={require("../../../assets/images/background/bg_2.jpg")}
            style={acbScoreStyles.container}
            resizeMode="cover"
        >
            {/* Header with Back Button */}
            <View style={acbScoreStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <Text style={acbScoreStyles.title}>ACB Score</Text>

            {/* Centered GaugeChart */}
            <View style={{ alignItems: "center", marginVertical: 16 }}>
                <GaugeChart value={totalScore} />
                <Text style={acbScoreStyles.scoreText}>Total Score: {totalScore}</Text>
            </View>

            {/* Drug List or Empty State */}
            {drugs.length > 0 ? (
                <FlatList
                    data={drugs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={acbScoreStyles.drugItem}>
                            <View>
                                <Text style={acbScoreStyles.drugName}>{item.productName}</Text>
                                <Text style={acbScoreStyles.drugScore}>Acb Score: {item.acbScore}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteDrug(item.id)}>
                                <TrashIcon size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        No drugs found in this report.
                    </Text>
                </View>
            )}

            {/* Next Button */}
            <TouchableOpacity
                style={[
                    acbScoreStyles.nextButton,
                    { opacity: drugs.length === 0 ? 0.5 : 1 },
                ]}
                onPress={handleNext}
                disabled={drugs.length === 0}
            >
                <Text style={acbScoreStyles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}
