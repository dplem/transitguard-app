import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { parseCSV } from '@/utils/csvParser';
import { SafetyIndexEntry } from '@/types/csv';

const SafetyIndex = () => {
  const [safetyData, setSafetyData] = useState<SafetyIndexEntry[]>([]);

  useEffect(() => {
    const fetchSafetyData = async () => {
      try {
        const response = await fetch('/data/safety_index.csv');
        const csvText = await response.text();
        const parsedData = parseCSV<SafetyIndexEntry>(csvText);
        setSafetyData(parsedData);
      } catch (error) {
        console.error('Error fetching safety data:', error);
      }
    };

    fetchSafetyData();
  }, []);

  if (safetyData.length === 0) {
    return (
      <Card className="p-4">
        <h2 className="text-blue-600 text-xl font-bold mb-1">Safety Index</h2>
        <p className="text-gray-600">Loading safety data...</p>
      </Card>
    );
  }

  // Find the entry for July 13, 2024
  const targetDate = '2024-07-13';
  const targetEntry = safetyData.find(entry => entry.Date === targetDate);
  
  if (!targetEntry) {
    return (
      <Card className="p-4">
        <h2 className="text-blue-600 text-xl font-bold mb-1">Safety Index</h2>
        <p className="text-gray-600">No data available for July 13, 2024</p>
      </Card>
    );
  }

  const safetyIndex = parseInt(targetEntry.safety_index || "0");
  
  // Calculate improvement from 7 days before
  const sevenDaysBefore = new Date(targetDate);
  sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);
  const previousDate = sevenDaysBefore.toISOString().split('T')[0];
  const previousEntry = safetyData.find(entry => entry.Date === previousDate);
  
  const previousIndex = parseInt(previousEntry?.safety_index || "0");
  const improvement = previousIndex ? ((safetyIndex - previousIndex) / previousIndex * 100).toFixed(1) : "0";

  return (
    <Card className="p-4">
      <h2 className="text-blue-600 text-xl font-bold mb-1">Safety Index</h2>
      <p className="text-gray-600 mb-3">Overall system status for July 13, 2024</p>
      
      <div className="flex items-baseline mb-2">
        <span className="text-3xl font-bold text-yellow-500">{safetyIndex}/100</span>
      </div>
      
      <p className="text-sm text-green-600 mb-2">
        {parseFloat(improvement) >= 0 
          ? `${Math.abs(parseFloat(improvement))}% improvement from previous 7-day average`
          : `${Math.abs(parseFloat(improvement))}% decrease from previous 7-day average`
        }
      </p>
      
      <Progress value={safetyIndex} className="bg-gray-100 h-2" />
    </Card>
  );
};

export default SafetyIndex;
