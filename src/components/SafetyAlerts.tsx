
import React from 'react';
import { alerts, getSafetyLevelClass } from '@/utils/safetyData';
import { Bell } from 'lucide-react';

const SafetyAlerts = () => {
  return (
    <div className="safety-card">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-transit-blue" />
        <h2>Safety Alerts</h2>
      </div>
      
      <div className="space-y-4">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`border-l-4 pl-3 py-2 ${
              alert.level === 'safe' 
                ? 'border-safety-safe' 
                : alert.level === 'warning'
                ? 'border-safety-warning'
                : 'border-safety-danger'
            } ${alert.isRead ? 'opacity-70' : ''}`}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{alert.title}</h3>
              {!alert.isRead && (
                <div className="w-2 h-2 rounded-full bg-transit-blue"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyAlerts;
