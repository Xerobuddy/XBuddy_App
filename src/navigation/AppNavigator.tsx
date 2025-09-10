import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Onboarding from '../screens/Onboarding/Onboarding';
import LoginScreen from '../screens/Auth/Login/Login';
import SignUpScreen from '../screens/Auth/SignUp/SignUp';
import GenderScreen from '../screens/Auth/GenderSelection/Gender';
import ProfessionScreen from '../screens/Auth/ProfessionSelection/ProfessionSelection';
import ProfessionVerificationScreen from '../screens/Auth/ProfessionSelection/ProfessionalVerification/ProfessionalVerification';
import PatientDetail from '../screens/SalivaryAssessment/PatientDetail/PatientDetail';
import XerostomiaIntroScreen from '../screens/SalivaryAssessment/Xerostomia/XerostomiaIntroScreen';
import XerostomiaQuestionScreen from '../screens/SalivaryAssessment/Xerostomia/XerostomiaQuestionScreen';
import XerostomiaInfoScreen from '../screens/SalivaryAssessment/Xerostomia/XerostomiaInfoScreen';
import DrugSearchScreen from '../screens/SalivaryAssessment/DrugSearch/DrugSearch';
import AcbScoreScreen from '../screens/SalivaryAssessment/AcbScore/AcbScoreScreen';
import ReportSummaryScreen from '../screens/SalivaryAssessment/ReportSummary/ReportSummary';
import AdvancedDiagnosticsScreen from '../screens/SalivaryAssessment/AdvancedDiagnostics/AdvancedDiagnostics';
import USFRScreen from '../screens/SalivaryAssessment/AdvancedDiagnostics/USFR/USFR';
import SFRScreen from '../screens/SalivaryAssessment/AdvancedDiagnostics/SFR/SFR';
import HomeScreen from '../screens/HomePage/HomePage';
import ProductsScreen from '../screens/ProductsScreen/ProductsScreen';
import ProductDetailScreen from '../screens/ProductsScreen/ProductDetail/ProductDetailScreen';
import SalivaFactsScreen from '../screens/SalivaFacts/SalivaFactsScreen';
import SettingScreen from '../screens/Settings/SettingsScreen';
import FAQScreen from '../screens/Settings/Faq/FaqScreen';
import AboutScreen from '../screens/Settings/About/AboutScreen';
import SelectLanguageScreen from '../screens/Settings/SelectLanguage/SelectLanguage';
import SchirmerTest from '../screens/SalivaryAssessment/AdvancedDiagnostics/SchirmerTest/SchirmerTest';
import TutorialScreen from '../screens/SalivaryAssessment/AdvancedDiagnostics/Tutotrial/TutorialScreen';
import TermsAndConditions from '../screens/Settings/TermsAndConditions/TermsAndConditions';
import TermsOfUse from '../screens/Settings/TermsAndConditions/TermsOfUse/TermsOfUse';
import PrivacyPolicy from '../screens/Settings/TermsAndConditions/PrivacyPolicy/PrivacyPolicy';
import FactDetailScreen from '../screens/SalivaFacts/FactDetail/FactDetail';
// import { SalivaFact } from '../utils/types';

export type RootStackParamList = {
  SplashScreen: undefined;
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  GenderScreen: undefined;
  ProfessionScreen: undefined;
  ProfessionVerificationScreen: undefined;
  PatientDetail: undefined;
  XerostomiaScreen: { reportId: string };
  XerostomiaQuestion: { questionNumber: number; reportId: string };
  XerostomiaInfo: { reportId: string };
  DrugSearchScreen: {reportId: string};
  AcbScoreScreen: {reportId: string};
  ReportSummary: {reportId: string};
  AdvancedDiagnostics: {reportId: string};
  USFRScreen: {reportId: string};
  SFRScreen: {reportId: string};
  HomePage: undefined;
  ProductsScreen: undefined;
  ProductDetailsScreen: { productId: string };
  SalivaFactsScreen: undefined;
  SettingScreen: undefined;
  FaqScreen: undefined;
  AboutScreen: undefined;
  LanguageScreen: undefined;
  SchirmerTestScreen: undefined;
  TutorialScreen: undefined;
  TermAndConditionScreen: undefined;
  TermsOfUseScreen: undefined;
  PrivacyPolicyScreen: undefined;
  FactDetailScreen: { factId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardingScreen" component={Onboarding} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="ProfessionScreen" component={ProfessionScreen} />
      <Stack.Screen name="ProfessionVerificationScreen" component={ProfessionVerificationScreen}/>
      <Stack.Screen name="PatientDetail" component={PatientDetail} />
      <Stack.Screen name="XerostomiaScreen" component={XerostomiaIntroScreen} initialParams={{ reportId: '' }}/>
      <Stack.Screen name="XerostomiaQuestion" component={XerostomiaQuestionScreen}/>
      <Stack.Screen name="XerostomiaInfo" component={XerostomiaInfoScreen}/>
      <Stack.Screen name="DrugSearchScreen" component={DrugSearchScreen}/>
      <Stack.Screen name="AcbScoreScreen" component={AcbScoreScreen}/>
      <Stack.Screen name="ReportSummary" component={ReportSummaryScreen}/>
      <Stack.Screen name="AdvancedDiagnostics" component={AdvancedDiagnosticsScreen}/>
      <Stack.Screen name="USFRScreen" component={USFRScreen}/>
      <Stack.Screen name="SFRScreen" component={SFRScreen}/>
      <Stack.Screen name="HomePage" component={HomeScreen} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailScreen} />
      <Stack.Screen name="SalivaFactsScreen" component={SalivaFactsScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="FaqScreen" component={FAQScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="LanguageScreen" component={SelectLanguageScreen} />
      <Stack.Screen name="SchirmerTestScreen" component={SchirmerTest} />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
      <Stack.Screen name="TermAndConditionScreen" component={TermsAndConditions} />
      <Stack.Screen name="TermsOfUseScreen" component={TermsOfUse} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicy} />
      <Stack.Screen name="FactDetailScreen" component={FactDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
