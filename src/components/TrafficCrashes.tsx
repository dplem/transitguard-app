
import React from 'react';
import { Card } from '@/components/ui/card';
import trafficData from '@/data/traffic_crash_daily_totals_july_2024.csv';
import { Car } from 'lucide-react';

const TrafficCrashes: React.FC = () => {
  // Find data for July 13th
  const todaysData = trafficData.find(day => day.DATE === '2024-07-13');
  
  const totalCrashes = todaysData?.TOTAL_CRASHES || 0;
  const fatalities = todaysData?.TOTAL_FATALITIES || 0;
  const incapacitatingInjuries = todaysData?.TOTAL_INCAPACITATING_INJURIES || 0;
  const nonIncapacitatingInjuries = todaysData?.TOTAL_NON_INCAPACITATING_INJURIES || 0;

  return (
    <Card className="p-4 border-t-4 border-t-yellow-400">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold">Traffic Crashes</h2>
        <Car className="text-yellow-400 h-5 w-5" />
      </div>
      
      <div className="text-4xl font-bold mb-4">{totalCrashes}</div>
      
      <div className="space-y-1 text-sm">
        <div>Fatalities: {fatalities}</div>
        <div>Incapacitating Injuries: {incapacitatingInjuries}</div>
        <div>Non-Incapacitating Injuries: {nonIncapacitatingInjuries}</div>
      </div>
    </Card>
  );
};

export default TrafficCrashes;
