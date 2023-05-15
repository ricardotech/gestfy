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
import { TextInput } from "react-native-gesture-handler";
import { useAuth } from "../../../contexts/Auth";
import DropdownAlert from "react-native-dropdownalert";
import OnboardingWorkspace from "./Workspace";

export default function Onboarding() {
  const [step, setStep] = useState(0);

  return <OnboardingWorkspace />;
}
