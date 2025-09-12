import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { drugSearchStyles } from "./drugSearch.styles";
import { PlusIcon } from "react-native-heroicons/outline";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

interface Drug {
  id: string;
  drugName: string;
  acbScore: number;
}

export default function DrugSearchScreen({ route, navigation }: any) {
  const { reportId } = route.params;
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [filtered, setFiltered] = useState<Drug[]>([]);
  const [searchText, setSearchText] = useState("");
  const [numDrugsRequired, setNumDrugsRequired] = useState<number>(0);
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newDrug, setNewDrug] = useState({ drugName: "", acbScore: 0 });

  const userEmail = auth().currentUser?.email;

  // Fetch drugs from Firestore
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const querySnap = await firestore().collection("drugs").get();
        const list: Drug[] = [];
        querySnap.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            drugName: data.drugName,
            acbScore: data.acbScore,
          });
        });
        setDrugs(list);
        setFiltered(list);
      } catch (err) {
        console.error("Error fetching drugs:", err);
      }
    };
    fetchDrugs();
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
      setFiltered(drugs);
    } else {
      const filteredList = drugs.filter((d) =>
        d.drugName.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(filteredList);
    }
  };

  const handleAddDrugToReport = async (drug: Drug) => {
    try {
      if (!userEmail) return;
      if (selectedDrugs.length >= numDrugsRequired) {
        Alert.alert(
          "Limit reached",
          `You have already added the required number of drugs (${numDrugsRequired}).`
        );
        return;
      }

      await firestore()
        .collection("users")
        .doc(userEmail)
        .collection("reports")
        .doc(reportId)
        .update({ drugs: firestore.FieldValue.arrayUnion(drug) });

      await firestore()
        .collection("admin")
        .doc("reports")
        .collection("reports")
        .doc(reportId)
        .update({ drugs: firestore.FieldValue.arrayUnion(drug) });

      Alert.alert("Success", `${drug.drugName} added to the report.`);
    } catch (err) {
      Alert.alert("Error", "Failed to add drug.");
      console.error(err);
    }
  };

  // Add new drug to the database
  const handleSaveDrug = async () => {
    if (!newDrug.drugName.trim()) {
      Alert.alert("Error", "Drug name cannot be empty.");
      return;
    }
    if (newDrug.acbScore < 0 || newDrug.acbScore > 3) {
      Alert.alert("Error", "ACB Score must be between 0 and 3.");
      return;
    }
    try {
      await firestore()
        .collection("drugs")
        .doc(newDrug.drugName.trim())
        .set({ drugName: newDrug.drugName.trim(), acbScore: newDrug.acbScore });

      setShowModal(false);
      setNewDrug({ drugName: "", acbScore: 0 });

      const querySnap = await firestore().collection("drugs").get();
      const list: Drug[] = [];
      querySnap.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({ id: docSnap.id, drugName: data.drugName, acbScore: data.acbScore });
      });
      setDrugs(list);
      setFiltered(list);
    } catch (err) {
      console.error("Error adding drug:", err);
      Alert.alert("Error", "Failed to add drug.");
    }
  };

  const renderItem = ({ item }: { item: Drug }) => {
    const isDisabled = selectedDrugs.length >= numDrugsRequired;
    return (
      <View style={drugSearchStyles.productItem}>
        <View>
          <Text style={drugSearchStyles.productName}>{item.drugName}</Text>
          <Text style={drugSearchStyles.productScore}>ACB Score: {item.acbScore}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAddDrugToReport(item)}
          style={[drugSearchStyles.addButton, isDisabled && { backgroundColor: "#888" }]}
          disabled={isDisabled}
        >
          <PlusIcon size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

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

      {/* Search + Add */}
      <View style={drugSearchStyles.searchContainer}>
        <TextInput
          style={drugSearchStyles.searchInput}
          placeholder="Search drugs..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={drugSearchStyles.addDrugButton} onPress={() => setShowModal(true)}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Add Drug</Text>
        </TouchableOpacity>
      </View>

      {/* Hint */}
      {searchText.length > 0 && filtered.length === 0 && (
        <Text style={drugSearchStyles.hintText2}>
          No drug found. You can add it using the "Add Drug" button.
        </Text>
      )}

      {/* Drug list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={drugSearchStyles.list}
      />

      {/* Next button */}
      <TouchableOpacity
        style={[drugSearchStyles.nextButton, !isComplete && { backgroundColor: "#989898" }]}
        onPress={() =>
          isComplete
            ? navigation.navigate("AcbScoreScreen", { reportId })
            : Alert.alert("Incomplete", "Please add all required drugs.")
        }
      >
        <Text style={drugSearchStyles.nextButtonText}>{isComplete ? "Next" : "Add Item"}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={showModal} animationType="slide">
        <View style={drugSearchStyles.modalOverlay}>
          <View style={drugSearchStyles.modalContainer}>
            <Text style={drugSearchStyles.modalTitle}>Add New Drug</Text>

            {/* Drug Name Label & Input */}
            <Text style={drugSearchStyles.modalLabel}>Drug Name <Text style={{ color: "red" }}>*</Text></Text>
            <TextInput
              placeholder="Enter drug name"
              value={newDrug.drugName}
              onChangeText={(text) => setNewDrug({ ...newDrug, drugName: text })}
              style={drugSearchStyles.modalInput}
            />

            {/* ACB Score Label & Input */}
            <Text style={drugSearchStyles.modalLabel}>ACB Score (Optional)</Text>
            <TextInput
              placeholder="0-3"
              value={newDrug.acbScore === 0 ? "" : newDrug.acbScore.toString()}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => {
                let value = Number(text);
                if (!text) value = 0;
                if (value > 3) value = 3;
                if (value < 0) value = 0;
                setNewDrug({ ...newDrug, acbScore: value });
              }}
              style={drugSearchStyles.modalInput}
            />
            <Text style={drugSearchStyles.hintText}>
              ACB Score is optional. Defaults to 0 if left empty.
            </Text>

            {/* Buttons */}
            <View style={drugSearchStyles.modalButtons}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={drugSearchStyles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveDrug}>
                <Text style={drugSearchStyles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
