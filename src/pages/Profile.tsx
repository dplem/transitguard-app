
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Profile = () => {
  return (
    <Layout title="My Profile">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarFallback className="bg-transit-blue text-white text-xl">
            TG
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">TransitGuard User</h2>
        <p className="text-gray-500">Chicago, IL</p>
      </div>
      
      <Card className="p-4 mb-4">
        <h3 className="font-medium mb-3">Safety Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="location">Share Location</Label>
              <p className="text-xs text-gray-500">For personalized safety alerts</p>
            </div>
            <Switch id="location" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="anonymous">Anonymous Reporting</Label>
              <p className="text-xs text-gray-500">Report incidents anonymously</p>
            </div>
            <Switch id="anonymous" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data">Data Sharing</Label>
              <p className="text-xs text-gray-500">Help improve safety predictions</p>
            </div>
            <Switch id="data" defaultChecked />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 mb-4">
        <h3 className="font-medium mb-3">Saved Routes</h3>
        <p className="text-sm text-gray-500 mb-3">
          No saved routes. Add your frequent commute routes to receive targeted safety alerts.
        </p>
        <Button variant="outline" className="w-full">Add Route</Button>
      </Card>
      
      <Card className="p-4 mb-4">
        <h3 className="font-medium mb-3">About TransitGuard</h3>
        <p className="text-sm mb-2">
          TransitGuard provides real-time safety information for Chicago public transportation.
        </p>
        <div className="space-y-1 text-sm">
          <p>Version: 1.0.0</p>
          <p>© 2025 TransitGuard</p>
        </div>
      </Card>
      
      <div className="flex space-x-2 mt-6">
        <Button variant="outline" className="flex-1">Help & Support</Button>
        <Button variant="outline" className="flex-1">Privacy Policy</Button>
      </div>
      
      <Button variant="ghost" className="w-full mt-4 text-gray-500">
        Sign Out
      </Button>
    </Layout>
  );
};

export default Profile;
