
import React from 'react';
import Layout from '@/components/Layout';
import SafetyIndex from '@/components/SafetyIndex';
import CrimeIncidents from '@/components/CrimeIncidents';
import TrafficCrashes from '@/components/TrafficCrashes';
import LineStatus from '@/components/LineStatus';
import { Card } from '@/components/ui/card';
import { AlertTriangle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout title="TransitGuard">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 mt-2 mb-4">Safety Overview</h3>
        
        {/* Safety Index */}
        <SafetyIndex />
        
        <div className="grid grid-cols-2 gap-4">
          {/* Crime Incidents */}
          <CrimeIncidents />
          
          {/* Traffic Crashes */}
          <TrafficCrashes />
        </div>
        
        {/* Line Status */}
        <LineStatus />
        
        {/* Quick Actions */}
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
