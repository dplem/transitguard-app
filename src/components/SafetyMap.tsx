
import React, { useEffect, useRef, useState } from 'react';
import { allTransitPoints, SafetyLevel, getSafetyLevelClass, getSafetyLevelText } from '@/utils/safetyData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

type TimeFrame = '24h' | '7d' | '30d';

const mapFiles = {
  '24h': '/data/July_13_crimes_and_crashes_map.html',
  '7d': '/data/Last_7_days_2024_crimes_and_crashes_map.html',
  '30d': '/data/Last_30_days_2024_crimes_and_crashes_map.html'
};

const timeFrameLabels = {
  '24h': 'Last 24 Hours',
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days'
};

const SafetyMap = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('24h');

  useEffect(() => {
    // Reset iframe height after load to ensure proper sizing
    const handleIframeLoad = () => {
      if (iframeRef.current) {
        iframeRef.current.style.height = 'auto';
        const newHeight = iframeRef.current.contentWindow?.document.body.scrollHeight;
        if (newHeight) {
          iframeRef.current.style.height = `${newHeight}px`;
        }
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [timeFrame]); // Re-run when timeFrame changes

  return (
    <div className="w-full rounded-lg bg-gray-100 overflow-hidden mb-4">
      <div className="p-4 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Safety Map</h3>
          <Select
            value={timeFrame}
            onValueChange={(value) => setTimeFrame(value as TimeFrame)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">{timeFrameLabels['24h']}</SelectItem>
              <SelectItem value="7d">{timeFrameLabels['7d']}</SelectItem>
              <SelectItem value="30d">{timeFrameLabels['30d']}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full overflow-hidden rounded-lg">
          <iframe 
            ref={iframeRef}
            src={mapFiles[timeFrame]} 
            className="w-full border-0"
            style={{ height: '400px', minHeight: '300px' }}
            title={`${timeFrameLabels[timeFrame]} Crimes and Crashes Map`}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4 px-2 w-full">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-safety-safe mr-2"></span>
            <span className="text-sm">Safe Areas</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-safety-warning mr-2"></span>
            <span className="text-sm">Caution Areas</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-safety-danger mr-2"></span>
            <span className="text-sm">High Risk Areas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
