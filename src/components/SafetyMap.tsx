
import React from 'react';
import { allTransitPoints, SafetyLevel, getSafetyLevelClass, getSafetyLevelText } from '@/utils/safetyData';

const SafetyMap = () => {
  return (
    <div className="w-full rounded-lg bg-gray-100 overflow-hidden mb-4">
      <div className="p-6 flex flex-col items-center justify-center h-64">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Safety Map</h3>
          <p className="text-sm text-gray-500">
            View available in the full app
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-xs">
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
