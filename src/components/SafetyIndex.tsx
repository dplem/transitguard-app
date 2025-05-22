
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import safetyData from '../../public/data/safety_index.csv';

const SafetyIndex = () => {
  // Get the latest safety index entry
  const latestEntry = safetyData[safetyData.length - 1];
  const safetyIndex = parseInt(latestEntry?.safety_index || "0");
  
  // Calculate improvement
  const previousEntry = safetyData[safetyData.length - 8]; // Get data from 7 days before
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
