import React from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import { advancedDiagnosticsStyles as styles } from "./advancedDiagnostics.styles";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

// Import your SVGs from assets
import USFRIcon from "../../../assets/images/illustrations/usfr.svg";
import SFRIcon from "../../../assets/images/illustrations/sfr.svg";
import SchirmerIcon from "../../../assets/images/illustrations/schirmer.svg";

export default function AdvancedDiagnostics({ route, navigation }: any) {
  const { reportId } = route.params;

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

      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Image
          source={require("../../../assets/images/illustrations/stethoscope.png")}
          style={{ width: 80, height: 80, marginRight: 4 }}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.containerText}>Advanced</Text>
          <Text style={styles.containerText}>Diagnostics</Text>
        </View>
      </View>

      {/* Body Text */}
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.bodyText}>
          Based on your current results, we recommend undergoing a more in-depth diagnostic evaluation.
        </Text>
        <Text style={styles.bodyText}>
          For this purpose, the modified Schirmer test or the unstimulated salivary flow rate measurement are suitable.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("USFRScreen", { reportId })}
        >
          <USFRIcon width={32} height={32} />
          <Text style={styles.buttonText}>USFR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("SFRScreen", { reportId })}
        >
          <SFRIcon width={32} height={32} />
          <Text style={styles.buttonText}>SFR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("SchirmerTestScreen", { reportId })}
        >
          <SchirmerIcon width={32} height={32} />
          <Text style={styles.buttonText}>Schirmer Test</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
