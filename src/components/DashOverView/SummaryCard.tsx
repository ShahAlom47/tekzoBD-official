import React from "react";

type ValueType = {
  label: string | number;
  value: string | number;
};

interface SummaryCardProps {
  children: React.ReactNode;  // usually icon or element
  title: string;
  values: ValueType[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ children, title, values }) => {
  return (
    <div className="bg-white shadow rounded p-4 min-w-[200px]">
      <div className="flex items-center gap-2 mb-3 text-lg font-semibold">
        {children}
        <span>{title}</span>
      </div>
      <div className="space-y-1">
        {values?.map((item, i) => (
          <div key={i} className="flex justify-between">
            <p className="text-gray-600">{item.label}</p>
            <p className="font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
