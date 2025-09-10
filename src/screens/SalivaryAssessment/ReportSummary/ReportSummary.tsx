import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Alert, Platform } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { PrinterIcon, ClipboardDocumentListIcon } from "react-native-heroicons/outline";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";
import { reportSummaryStyles as styles } from "./reportSummary.styles";
import GuageChart from "../../../components/GuageChart";

export default function ReportSummary({ route, navigation }: any) {
  const { reportId } = route.params;
  const [report, setReport] = useState<any>(null);
  const userEmail = auth().currentUser?.email;

  useEffect(() => {
    if (!userEmail) return;

    const unsubscribe = firestore()
      .collection("users")
      .doc(userEmail)
      .collection("reports")
      .doc(reportId)
      .onSnapshot((doc) => {
        if (doc.exists()) {
          setReport(doc.data());
        } else {
          Alert.alert("Error", "Report not found.");
        }
      });

    return () => unsubscribe();
  }, [userEmail, reportId]);

  const getAcbColor = (score: number) => {
    if (score <= 1) return "#4CAF50";
    if (score === 2) return "#FFC107";
    return "#F44336";
  };

  const getXeroColor = (score: number) => {
    if (score <= 3) return "#4CAF50";
    if (score <= 6) return "#FFC107";
    return "#F44336";
  };

  const getUSFRColor = (score: number) => {
    if (score <= 2) return "#4CAF50";  // Green
    if (score <= 5) return "#FFC107";  // Amber
    return "#F44336";                  // Red
  };

  const getSFRColor = (score: number) => {
    if (score <= 3) return "#4CAF50";
    if (score <= 6) return "#FFC107";
    return "#F44336";
  };

  const getSchirmerColor = (score: number) => {
    if (score <= 5) return "#4CAF50";
    if (score <= 10) return "#FFC107";
    return "#F44336";
  };


  const calculateAcbScore = (drugs: any[] = []) => {
    if (!drugs || drugs.length === 0) return 0;
    return drugs.reduce((total, drug) => total + (drug.acbScore || 0), 0);
  };

  const generatePDF = async () => {
    if (!report) return;

    const numDrugs = report.drugs ? report.drugs.length : 0;

    const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <!-- Header -->
    <div style="text-align:center; margin-bottom: 20px;">
      <img src="file:///assets/App_Logo.png" width="80" height="80" style="margin-bottom: 10px;" />
      <h1 style="margin: 0; font-size: 24px; color: #2c3e50;">Report Summary</h1>
    </div>

    <!-- Patient Info -->
    <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
      <p><strong>Report ID:</strong> ${report.reportId}</p>
      <p><strong>Patient Name:</strong> ${report.patientName}</p>
      <p><strong>Gender:</strong> ${report.gender}</p>
      <p><strong>Age:</strong> ${report.age}</p>
      <p><strong>Number of Drugs:</strong> ${numDrugs}</p>
      <p><strong>Xerostomia Score:</strong> ${report.xerostomiaScore}</p>
      <p><strong>ACB Score:</strong> ${calculateAcbScore(report.drugs)}</p>
      ${report.schirmerTest ? `<p><strong>Schirmer Test:</strong> ${report.schirmerTest}</p>` : ""}
      ${report.sfr ? `<p><strong>SFR:</strong> ${report.sfr}</p>` : ""}
      ${report.usfr ? `<p><strong>USFR:</strong> ${report.usfr}</p>` : ""}
    </div>

    <!-- Drugs Table -->
    <h3 style="margin-bottom: 10px; color: #2c3e50;">Drugs List</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="background: #2c3e50; color: #fff;">
          <th style="padding: 10px; text-align: left;">Drug Name</th>
          <th style="padding: 10px; text-align: left;">ACB Score</th>
        </tr>
      </thead>
      <tbody>
        ${report.drugs.map((drug: any, index: number) => `
          <tr style="background: ${index % 2 === 0 ? "#f2f2f2" : "#fff"};">
            <td style="padding: 10px; border: 1px solid #ddd;">${drug.productName}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${drug.acbScore}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>
`;


    try {
      let folderPath = '';

      if (Platform.OS === 'android') {
        folderPath = `${RNFS.DownloadDirectoryPath}/Xerobuddy`; // Your app-specific folder
        // Create folder if it doesn't exist
        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          await RNFS.mkdir(folderPath);
        }
      }

      const options = {
        html: htmlContent,
        fileName: `Report_${reportId}`,
        directory: Platform.OS === 'android' ? 'Download' : undefined,
      };

      const file = await RNHTMLtoPDF.convert(options);

      if (Platform.OS === 'android') {
        // Move file to app-specific folder
        const newFilePath = `${folderPath}/Report_${reportId}.pdf`;
        await RNFS.moveFile(file.filePath, newFilePath);
        Alert.alert("PDF Generated", `File saved at: ${newFilePath}`);
      } else {
        Alert.alert("PDF Generated", `File saved at: ${file.filePath}`);
      }

    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };

  if (!report) return null;

  const numDrugs = report.drugs ? report.drugs.length : 0;

  return (
    <ImageBackground
      source={require("../../../assets/images/background/bg_2.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Summary</Text>
          <Text style={styles.subtitle}>{reportId}</Text>
        </View>

        {/* Guage */}
        <View style={styles.guage}>
          <GuageChart value={calculateAcbScore(report.drugs)} />
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Gender: {report.gender}</Text>
          <View style={styles.infoDivider} />
          <Text style={styles.infoText}>Age: {report.age}</Text>
          <View style={styles.infoDivider} />
          <Text style={styles.infoText}>Number of Drugs: {numDrugs}</Text>
        </View>

        {/* Xerostomia Score */}
        <View style={[styles.card, { backgroundColor: getXeroColor(report.xerostomiaScore) }]}>
          <Text style={styles.cardTitle}>Xerostomia Score</Text>
          <Text style={styles.cardValue}>{Number(report.xerostomiaScore).toFixed(1)}</Text>
        </View>

        {/* ACB Score */}
        <View style={[styles.card, { backgroundColor: getAcbColor(calculateAcbScore(report.drugs)) }]}>
          <Text style={styles.cardTitle}>ACB Score</Text>
          <Text style={styles.cardValue}>{calculateAcbScore(report.drugs)}</Text>
        </View>

        {/* Conditional Test Scores with color */}
        {report.usfr !== undefined && (
          <View style={[styles.card, { backgroundColor: getUSFRColor(report.usfr) }]}>
            <Text style={styles.cardTitle}>USFR</Text>
            <Text style={styles.cardValue}>{Number(report.usfr).toFixed(1)} ml/5min</Text>
          </View>
        )}

        {report.sfr !== undefined && (
          <View style={[styles.card, { backgroundColor: getSFRColor(report.sfr) }]}>
            <Text style={styles.cardTitle}>SFR</Text>
            <Text style={styles.cardValue}>{Number(report.sfr).toFixed(1)} ml/5min</Text>
          </View>
        )}

        {report.schirmerTest !== undefined && (
          <View style={[styles.card, { backgroundColor: getSchirmerColor(report.schirmerTest) }]}>
            <Text style={styles.cardTitle}>Schirmer Test</Text>
            <Text style={styles.cardValue}>{Number(report.schirmerTest).toFixed(1)}ml</Text>
          </View>
        )}


        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.filledButton} onPress={generatePDF}>
            <PrinterIcon size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.filledButtonText}>Print PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => Alert.alert("Todo", "We are working on this")}
          >
            <ClipboardDocumentListIcon size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.filledButtonText}>Todo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
