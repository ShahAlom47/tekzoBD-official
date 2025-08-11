import OverviewContent from '@/components/DashOverView/OverviewContent';
import TrafficAnalytics from '@/components/DashOverView/TrafficAnalytics';
import React from 'react';

const DashboardHome = () => {
    return (
        <div>
           <TrafficAnalytics></TrafficAnalytics>
           <OverviewContent></OverviewContent>
        </div>
    );
};

export default DashboardHome;