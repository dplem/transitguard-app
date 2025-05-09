
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { alerts, getSafetyLevelClass } from '@/utils/safetyData';
import { Button } from '@/components/ui/button';
import { Bell, BellRing } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Alerts = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  
  return (
    <Layout title="Safety Alerts">
      <div className="safety-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-transit-blue" />
            <h2>Alert Settings</h2>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Push Notifications</Label>
              <p className="text-sm text-gray-500">Receive alerts about safety incidents</p>
            </div>
            <Switch 
              id="notifications" 
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="nearby">Nearby Alerts Only</Label>
              <p className="text-sm text-gray-500">Only receive alerts for your frequent routes</p>
            </div>
            <Switch 
              id="nearby" 
              checked={nearbyOnly}
              onCheckedChange={setNearbyOnly}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 mb-3 flex items-center justify-between">
        <h2>Recent Alerts</h2>
        <Button variant="ghost" size="sm" className="text-xs">
          Mark all as read
        </Button>
      </div>
      
      <div className="space-y-4">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className="safety-card mb-0 border-l-4 pl-3 py-3"
            style={{ 
              borderLeftColor: alert.level === 'safe' ? '#4CAF50' : 
                               alert.level === 'warning' ? '#FF9800' : '#F44336' 
            }}
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
              <Button variant="ghost" size="sm" className="h-6 text-xs">Details</Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="text-sm font-medium mb-2">My Alert Zones</div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Subscribe to safety alerts for specific stations or routes
          </p>
          <Button variant="outline">Set Up Alert Zones</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
