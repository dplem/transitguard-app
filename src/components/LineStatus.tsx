
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { parseCSV } from '@/utils/csvParser';
import { LineCountEntry } from '@/types/csv';

const LineStatus = () => {
  const [lineData, setLineData] = useState<LineCountEntry[]>([]);

  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const response = await fetch('/data/line_counts_last_7_days.csv');
        const csvText = await response.text();
        const parsedData = parseCSV<LineCountEntry>(csvText);
        setLineData(parsedData);
      } catch (error) {
        console.error('Error fetching line data:', error);
      }
    };

    fetchLineData();
  }, []);

  // Map for line colors
  const lineColors = {
    'Red Line': 'bg-red-600',
    'Blue Line': 'bg-blue-600',
    'Green Line': 'bg-green-600',
    'Brown Line': 'bg-amber-800',
    'Purple': 'bg-purple-800',
    'Purple Line Express': 'bg-purple-600',
    'Yellow Line': 'bg-yellow-500',
    'Pink Line': 'bg-pink-400',
    'Orange Line': 'bg-orange-500'
  };

  // Map for risk flag colors
  const riskColors = {
    'High': 'bg-red-500 hover:bg-red-600',
    'Medium': 'bg-orange-500 hover:bg-orange-600',
    'Low': 'bg-green-500 hover:bg-green-600'
  };

  if (lineData.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-600">Line Status</CardTitle>
          <p className="text-sm text-gray-500">Current safety status by transit line (Last 7 Days)</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading line data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-600">Line Status</CardTitle>
        <p className="text-sm text-gray-500">Current safety status by transit line (Last 7 Days)</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {lineData.map((line, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center">
                <div className={`w-4 h-8 rounded mr-3 ${lineColors[line.line_code] || 'bg-gray-500'}`}></div>
                <span>{line.line_code}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {line.incident_count} incidents
                </span>
                <Badge 
                  variant="default" 
                  className={riskColors[line.risk_flag] || 'bg-gray-500'}
                >
                  {line.risk_flag}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            Low
          </div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
            Medium
          </div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            High
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineStatus;
