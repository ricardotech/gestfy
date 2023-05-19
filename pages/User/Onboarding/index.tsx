import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import OnboardingWorkspace from "./Workspace";

export default function Onboarding() {
  const [step, setStep] = useState(0);

  return <OnboardingWorkspace />;
}
