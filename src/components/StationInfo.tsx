
import React from 'react';
import { Station, getIncidentsByStationId } from '@/utils/safetyData';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface StationInfoProps {
  station: Station;
}

const StationInfo: React.FC<StationInfoProps> = ({ station }) => {
  const incidents = getIncidentsByStationId(station.id);

  return (
    <div className="safety-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-transit-blue" />
            <h2>{station.name}</h2>
          </div>
          <div className="flex items-center mt-1">
            <Badge variant={station.type === 'train' ? 'secondary' : 'outline'}>
              {station.type === 'train' ? 'L Station' : 'Bus Stop'}
            </Badge>
          </div>
        </div>
        
        <div className={`
          ${station.safetyLevel === 'safe' ? 'bg-safety-safe' : 
            station.safetyLevel === 'warning' ? 'bg-safety-warning' : 
            'bg-safety-danger'} 
          text-white px-3 py-1 rounded-full text-sm font-medium`}
        >
          {station.safetyLevel === 'safe' ? 'Safe' : 
           station.safetyLevel === 'warning' ? 'Caution' : 'High Risk'}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium">Safety Prediction</h3>
        <p className="text-sm">{station.prediction}</p>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium">Recent Incidents ({incidents.length})</h3>
        {incidents.length > 0 ? (
          <div className="space-y-2 mt-2">
            {incidents.slice(0, 2).map(incident => (
              <div key={incident.id} className="bg-gray-50 p-2 rounded">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">{incident.type}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(incident.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{incident.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-1">No recent incidents reported</p>
        )}
      </div>
    </div>
  );
};

export default StationInfo;
