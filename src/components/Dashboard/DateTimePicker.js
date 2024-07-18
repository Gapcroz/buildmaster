// DateTimePicker.js

import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTimePickerValue({ project }) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  React.useEffect(() => {
    if (project && project.weeks && project.weeks.length > 0) {
      setStartDate(dayjs(project.weeks[0].startDate));
      setEndDate(dayjs(project.weeks[0].endDate));
    }
  }, [project]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          label="Fecha Inicio"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <DateTimePicker
          label="Fecha Fin"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
