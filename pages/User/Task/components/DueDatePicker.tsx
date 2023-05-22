import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DueDatePicker() {
  const [date, setDate] = useState(new Date());

  return <DateTimePicker value={date} mode="time" />;
}
