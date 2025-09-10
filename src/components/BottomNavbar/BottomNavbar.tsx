import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { bottomNavbarStyles as styles } from "./bottomNavbar.styles";
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";

// Import all outline + filled icons
import HomeIconOutline from "../../assets/images/illustrations/homeIconOutline.svg";
import HomeIconFilled from "../../assets/images/illustrations/homeIconFilled.svg";

import ProductsIconOutline from "../../assets/images/illustrations/productIconOutline.svg";
import ProductsIconFilled from "../../assets/images/illustrations/productIconFilled.svg";

import FactsIconOutline from "../../assets/images/illustrations/salivaIconOutline.svg";
import FactsIconFilled from "../../assets/images/illustrations/salivaIconFilled.svg";

import SettingsIconOutline from "../../assets/images/illustrations/settingIconOutline.svg";
import SettingsIconFilled from "../../assets/images/illustrations/settingIconFilled.svg";

const BottomNavbar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const currentTab = route.name;

  const navItems = [
    {
      label: "HomePage",
      displayLabel: "Home",
      outlineIcon: HomeIconOutline,
      filledIcon: HomeIconFilled,
      onPress: () => {
        if (currentTab !== "HomePage") navigation.navigate("HomePage");
      },
    },
    {
      label: "ProductsScreen",
      displayLabel: "Products",
      outlineIcon: ProductsIconOutline,
      filledIcon: ProductsIconFilled,
      onPress: () => {
        if (currentTab !== "ProductsScreen") navigation.navigate("ProductsScreen");
      },
    },
    {
      label: "SalivaFactsScreen",
      displayLabel: "Saliva Facts",
      outlineIcon: FactsIconOutline,
      filledIcon: FactsIconFilled,
      onPress: () => {
        if (currentTab !== "SalivaFactsScreen") navigation.navigate("SalivaFactsScreen");
      },
    },
    {
      label: "SettingScreen",
      displayLabel: "Settings",
      outlineIcon: SettingsIconOutline,
      filledIcon: SettingsIconFilled,
      onPress: () => {
        if (currentTab !== "SettingScreen") navigation.navigate("SettingScreen");
      },
    },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => {
        const isActive = currentTab === item.label;
        const Icon = isActive ? item.filledIcon : item.outlineIcon;

        return (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={item.onPress}
          >
            <Icon width={24} height={24} />
            <Text style={[styles.navLabel, isActive && { color: "#8359E3" }]}>
              {item.displayLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavbar;
