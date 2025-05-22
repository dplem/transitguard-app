
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import rawSafetyData from '../../public/data/safety_index.csv';
import { parseCSV } from '@/utils/csvParser';
import { SafetyIndexEntry } from '@/types/csv';

const SafetyIndex = () => {
  useEffect(() => {
    console.log("Safety data raw type:", typeof rawSafetyData);
    // Check if rawSafetyData is a string before trying to use substring
    if (typeof rawSafetyData === 'string') {
      console.log("Safety data raw sample:", rawSafetyData.substring(0, 100));
    } else {
      console.log("Safety data is not a string:", rawSafetyData);
    }
  }, []);

  // Parse the CSV data
  const safetyData = parseCSV<SafetyIndexEntry>(rawSafetyData as unknown as string);
  
  console.log("Safety data parsed:", safetyData.length, "entries");
  console.log("Safety data sample:", safetyData[0]);
  
  // Get the latest safety index entry
  const latestEntry = safetyData[safetyData.length - 1];
  console.log("Latest safety entry:", latestEntry);
  
  const safetyIndex = parseInt(latestEntry?.safety_index || "0");
  
  // Calculate improvement
  const previousEntry = safetyData[safetyData.length - 8]; // Get data from 7 days before
  console.log("Previous safety entry:", previousEntry);
  
  const previousIndex = parseInt(previousEntry?.safety_index || "0");
  const improvement = previousIndex ? ((safetyIndex - previousIndex) / previousIndex * 100).toFixed(1) : "0";

  return (
    <Card className="p-4">
      <h2 className="text-blue-600 text-xl font-bold mb-1">Safety Index</h2>
      <p className="text-gray-600 mb-3">Overall system status</p>
      
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
