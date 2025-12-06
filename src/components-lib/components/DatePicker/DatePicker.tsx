import styles from "./DatePicker.module.scss";

import * as React from "react";

interface DatePickerProps {
  year?: number;
  month?: number;
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  label?: string;
}

const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MAX_CELLS = 42;

const DatePicker: React.FC<DatePickerProps> = ({
  year,
  month,
  selectedDate,
  onDateSelect,
  label,
}) => {
  const today = new Date();
  const [currentYear, setYear] = React.useState(year || today.getFullYear());
  const [currentMonth, setMonth] = React.useState(
    month || today.getMonth() + 1
  );

  const first = new Date(currentYear, currentMonth - 1, 1);
  const startingWeekday = first.getDay();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const handleDateClick = (day: number) => {
    if (onDateSelect) {
      const selected = new Date(currentYear, currentMonth - 1, day);
      onDateSelect(selected);
    }
  };

  // Navigate to selected date's month when selectedDate changes
  React.useEffect(() => {
    if (selectedDate) {
      setYear(selectedDate.getFullYear());
      setMonth(selectedDate.getMonth() + 1);
    }
  }, [selectedDate]);

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth - 1 &&
      selectedDate.getDate() === day
    );
  };

  const cells: React.ReactNode[] = [];

  for (let i = 0; i < startingWeekday; i++) {
    cells.push(<div key={`empty-start-${i}`} className={styles.dayCell} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const presentationDay = String(day).padStart(2, "0");
    const dateString = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${presentationDay}`;
    const isDaySelected = isSelected(day);
    cells.push(
      <div
        key={day}
        className={`${styles.cell} ${isDaySelected ? styles.selected : ""}`}
        tabIndex={0}
        aria-label={dateString}
        onClick={() => handleDateClick(day)}
        role="button"
        style={{ cursor: onDateSelect ? "pointer" : "default" }}
      >
        {presentationDay}
      </div>
    );
  }

  while (cells.length < MAX_CELLS) {
    cells.push(
      <div key={`empty-end-${cells.length}`} className={styles.dayCell} />
    );
  }

  const onSwitchPreviousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const onSwitchNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <div className={styles.root}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={onSwitchPreviousMonth}
          aria-label="Previous month"
        >
          ▲
        </button>
        <div className={styles.date}>
          {currentYear} {MONTH_NAMES[currentMonth - 1].toUpperCase()}
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={onSwitchNextMonth}
          aria-label="Next month"
        >
          ▼
        </button>
      </div>
      <div className={styles.header}>
        {WEEKDAYS.map((day) => (
          <div key={day} className={styles.cell}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>{cells}</div>
    </div>
  );
};

export default DatePicker;
