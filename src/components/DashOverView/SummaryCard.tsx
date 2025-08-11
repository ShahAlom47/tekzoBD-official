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
    <div className="bg-white shadow rounded p-4 min-w-[200px] inline-block my-4">
      <div className="flex items-center gap-2 mb-3 text-lg font-semibold py-2 border-b-2 border-brandPrimary">
        {children}
        <span>{title}</span>
      </div>
      <div className="space-y-1 flex md:flex-row flex-col items-center gap-3 justify-between">
        {values?.map((item, i) => (
          <div key={i} className="">
            <p className="font-bold">{item.value}</p>
            <p className="text-gray-600 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
