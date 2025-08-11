'use client'
import React from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers } from 'react-icons/fa';

const OverviewContent = () => {
    return (
        <div>
            <SummaryCard
  title="Total Users"
  values={[
    { label: "Today", value: 50 },
    { label: "Yesterday", value: 90 },
  ]}
>
  <FaUsers className="text-blue-500" />
</SummaryCard>
            
        </div>
    );
};

export default OverviewContent;