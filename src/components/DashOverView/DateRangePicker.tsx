"use client"
import React from "react";

const formatDate = (date: Date) => date.toISOString().slice(0, 10);

const presets = [
  {
    label: "Today",
    getRange: () => {
      const today = new Date();
      return { startDate: formatDate(today), endDate: formatDate(today) };
    },
  },
  {
    label: "This Week",
    getRange: () => {
      const today = new Date();
      const day = today.getDay(); // 0 (Sun) to 6 (Sat)
      const diffToMonday = day === 0 ? 6 : day - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - diffToMonday);
      return { startDate: formatDate(monday), endDate: formatDate(today) };
    },
  },
  {
    label: "This Month",
    getRange: () => {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      return { startDate: formatDate(firstDay), endDate: formatDate(today) };
    },
  },
  {
    label: "This Year",
    getRange: () => {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), 0, 1);
      return { startDate: formatDate(firstDay), endDate: formatDate(today) };
    },
  },
];

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  preset: string;
  onDateChange: (startDate: string, endDate: string) => void;
  onPresetChange: (preset: string) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  preset,
  onDateChange,
  onPresetChange,
}: DateRangePickerProps) {
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    onPresetChange(selected);

    const presetObj = presets.find((p) => p.label === selected);
    if (presetObj) {
      const range = presetObj.getRange();
      onDateChange(range.startDate, range.endDate);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value, endDate);
    onPresetChange(""); // clear preset on manual input
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(startDate, e.target.value);
    onPresetChange(""); // clear preset on manual input
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <label className="block">
        <span className="block font-medium mb-1">Preset Range</span>
        <select
          className="border rounded px-3 py-2"
          value={preset}
          onChange={handlePresetChange}
        >
          <option value="">Custom</option>
          {presets.map((p) => (
            <option key={p.label} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block font-medium mb-1">Start Date</span>
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={startDate}
          onChange={handleStartDateChange}
          max={endDate}
        />
      </label>

      <label className="block">
        <span className="block font-medium mb-1">End Date</span>
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
        />
      </label>
    </div>
  );
}
