import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { Calendar, LocaleConfig } from "react-native-calendars";

export default function AddDueDate({
  closeModal,
  activeTab,
  setActiveTab,
  dueDate,
  setDueDate,
}: {
  closeModal: () => void;
  activeTab: string | undefined;
  setActiveTab: any;
  dueDate: any;
  setDueDate: any;
}) {
  LocaleConfig.locales["pt"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt";

  return (
    <View
      style={{
        backgroundColor: "#1F1F1F",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Platform.OS === "android" && (
          <View
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              height: 60,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
            >
              <Text
                style={{
                  color: "#3E6FBC",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Calendar
          minDate={new Date().toISOString()}
          style={{
            marginTop: 10,
            width: Dimensions.get("window").width - 0,
            borderRadius: 10,
            paddingBottom: 30,
            backgroundColor: "#1F1F1F",
          }}
          hideExtraDays
          theme={{
            textMonthFontSize: 20,
            textDisabledColor: "#777",
            arrowColor: "#3E6FBC",
            agendaDayTextColor: "#3E6FBC",
            textSectionTitleColor: "#3E6FBC",
            todayTextColor: "#3E6FBC",
            backgroundColor: "#1F1F1F",
            calendarBackground: "#1F1F1F",
            monthTextColor: "#FFF",
            dayTextColor: "#FFF",
            selectedDayTextColor: "#FFF",
            selectedDayBackgroundColor: "#3E6FBC",
          }}
          onDayPress={(day) => {
            setDueDate(day.dateString);
            closeModal();
          }}
          markedDates={{
            [dueDate]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
      </View>
    </View>
  );
}
