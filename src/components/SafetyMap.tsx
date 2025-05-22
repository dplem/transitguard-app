
import React, { useEffect, useRef } from 'react';
import { allTransitPoints, SafetyLevel, getSafetyLevelClass, getSafetyLevelText } from '@/utils/safetyData';

const SafetyMap = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
  }, []);

  return (
    <div className="w-full rounded-lg bg-gray-100 overflow-hidden mb-4">
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Safety Map</h3>
        <div className="w-full overflow-hidden rounded-lg">
          <iframe 
            ref={iframeRef}
            src="/data/july_2024_crimes_and_crashes_map.html" 
            className="w-full border-0"
            style={{ height: '400px', minHeight: '300px' }}
            title="July 2024 Crimes and Crashes Map"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
        
        <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-safety-safe mr-2"></span>
              <span className="text-sm">Safe Areas</span>
            </div>
            <span className="text-sm">{allTransitPoints.filter(s => s.safetyLevel === 'safe').length} Stations</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-safety-warning mr-2"></span>
              <span className="text-sm">Caution Areas</span>
            </div>
            <span className="text-sm">{allTransitPoints.filter(s => s.safetyLevel === 'warning').length} Stations</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-safety-danger mr-2"></span>
              <span className="text-sm">High Risk Areas</span>
            </div>
            <span className="text-sm">{allTransitPoints.filter(s => s.safetyLevel === 'danger').length} Stations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
