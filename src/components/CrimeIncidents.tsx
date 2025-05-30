import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { parseCSV } from '@/utils/csvParser';
import { CrimeEntry } from '@/types/csv';

const CrimeIncidents = () => {
  const [crimeData, setCrimeData] = useState<CrimeEntry[]>([]);

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await fetch('/data/july_2024_crime_summary.csv');
        const csvText = await response.text();
        const parsedData = parseCSV<CrimeEntry>(csvText);
        setCrimeData(parsedData);
      } catch (error) {
        console.error('Error fetching crime data:', error);
      }
    };

    fetchCrimeData();
  }, []);

  if (crimeData.length === 0) {
    return (
      <Card className="p-4 border-t-4 border-t-red-500">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold">Total Crime Incidents</h2>
          <AlertTriangle className="text-red-500 h-5 w-5" />
        </div>
        <p className="text-gray-600">Loading crime data...</p>
      </Card>
    );
  }

  // Get today's date in format "2024-07-13"
  const today = "2024-07-13";
  
  // Filter crimes for today
  const todaysCrimes = crimeData.filter(crime => crime.date === today);
  const totalIncidents = todaysCrimes.reduce((acc, curr) => acc + parseInt(curr.count), 0);
  
  // Get yesterday's data to calculate percentage change
  const yesterday = "2024-07-12";
  const yesterdayCrimes = crimeData.filter(crime => crime.date === yesterday);
  const yesterdayTotal = yesterdayCrimes.reduce((acc, curr) => acc + parseInt(curr.count), 0);
  
  const percentageChange = yesterdayTotal ? 
    ((totalIncidents - yesterdayTotal) / yesterdayTotal * 100).toFixed(0) : "0";
  
  // Get battery count
  const batteryCount = todaysCrimes.find(crime => crime.primary_type === "BATTERY")?.count || "0";
  
  // Get robbery count
  const robberyCount = todaysCrimes.find(crime => crime.primary_type === "ROBBERY")?.count || "0";
  
  // Calculate "other" count
  const otherCount = totalIncidents - parseInt(batteryCount) - parseInt(robberyCount);

  return (
    <Card className="p-4 border-t-4 border-t-red-500">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold">Total Crime Incidents</h2>
        <AlertTriangle className="text-red-500 h-5 w-5" />
      </div>
      
      <div className="text-4xl font-bold mb-2">{totalIncidents}</div>
      
      <p className={`text-sm ${parseInt(percentageChange) > 0 ? 'text-red-500' : 'text-green-500'} mb-4`}>
        {parseInt(percentageChange) > 0 
          ? `${Math.abs(parseInt(percentageChange))}% increase from yesterday` 
          : `${Math.abs(parseInt(percentageChange))}% decrease from yesterday`
        }
      </p>
      
      <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-2">
        <div className="text-center">
          <div className="text-lg font-semibold">{batteryCount}</div>
          <div className="text-xs text-gray-500">Battery</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold">{robberyCount}</div>
          <div className="text-xs text-gray-500">Robbery</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold">{otherCount}</div>
          <div className="text-xs text-gray-500">Other</div>
        </div>
      </div>
    </Card>
  );
};

export default CrimeIncidents;
