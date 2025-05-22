
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafetyMap from '@/components/SafetyMap';
import SafetyPredictions from '@/components/SafetyPredictions';
import { stations, allTransitPoints } from '@/utils/safetyData';
import { MapPin, AlertTriangle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const safeStations = allTransitPoints.filter(s => s.safetyLevel === 'safe').length;
  const warningStations = allTransitPoints.filter(s => s.safetyLevel === 'warning').length;
  const dangerStations = allTransitPoints.filter(s => s.safetyLevel === 'danger').length;

  return (
    <Layout title="TransitGuard">
      <div className="space-y-6">
        <div className="bg-transit-blue text-white p-4 rounded-lg">
          <h1 className="text-xl font-bold mb-2">Real-Time Transit Safety</h1>
          <p className="text-sm opacity-90 mb-4">
            Stay informed about safety conditions across Chicago's public transportation network
          </p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-lg font-bold">{safeStations}</div>
              <div className="text-xs">Safe</div>
            </div>
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-lg font-bold">{warningStations}</div>
              <div className="text-xs">Caution</div>
            </div>
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-lg font-bold">{dangerStations}</div>
              <div className="text-xs">High Risk</div>
            </div>
          </div>
          <Button 
            variant="secondary" 
            className="w-full text-transit-blue"
            onClick={() => navigate('/map')}
          >
            <MapPin className="mr-2 h-4 w-4" />
            View Safety Map
          </Button>
        </div>

        <SafetyMap />
        
        <SafetyPredictions />

        <Card className="p-4">
          <h2 className="mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-4"
              onClick={() => navigate('/report')}
            >
              <MessageCircle className="h-6 w-6 mb-2" />
              <span>Report Incident</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-4"
              onClick={() => navigate('/alerts')}
            >
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span>View Alerts</span>
            </Button>
          </div>
        </Card>
        
        <div className="text-center text-xs text-gray-500 pb-4">
          TransitGuard - Real-Time Safety for Chicago Public Transportation
        </div>
      </div>
    </Layout>
  );
};

export default Index;
