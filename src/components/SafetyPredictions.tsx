
import React from 'react';
import { stations } from '@/utils/safetyData';

const SafetyPredictions = () => {
  const topStations = stations.slice(0, 4);

  return (
    <div className="safety-card">
      <h2 className="mb-4">Safety Predictions</h2>
      
      <div className="space-y-4">
        {topStations.map(station => (
          <div key={station.id} className="flex items-start border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
            <div className="flex-1">
              <h3 className="font-medium">{station.name}</h3>
              <p className="text-sm text-gray-600">{station.prediction}</p>
              <div className="flex items-center mt-1">
                <div className={`mr-2 px-2 py-0.5 text-xs rounded-full 
                  ${station.safetyLevel === 'safe' ? 'bg-safety-safe text-white' : 
                    station.safetyLevel === 'warning' ? 'bg-safety-warning text-white' : 
                    'bg-safety-danger text-white'}`}>
                  {station.safetyLevel === 'safe' ? 'Safe' : 
                   station.safetyLevel === 'warning' ? 'Caution' : 'High Risk'}
                </div>
                <span className="text-xs text-gray-500">
                  {station.incidents} reported incidents
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyPredictions;
