// App.tsx
import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import AppNavigator from "./src/navigation/AppNavigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/i18n/i18n";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    // Configure Google Sign-in
    GoogleSignin.configure({
      webClientId:
        "516332872631-a4l2omdm2j8jmasf91udmieljnvgt6cd.apps.googleusercontent.com",
      offlineAccess: true, // ensures refresh tokens
    });

    // Auth state listener
    const unsubscribe = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        if (user) {
          console.log("User signed in:", user.email);
        } else {
          console.log("No user signed in.");
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={isDarkMode ? "light-content" : "dark-content"}
          />
          <I18nextProvider i18n={i18n}>
            <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          </I18nextProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
