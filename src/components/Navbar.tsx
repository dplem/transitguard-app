
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle, MessageCircle, Bell, Info } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <Button 
          variant="ghost" 
          className={`bottom-tab ${isActive('/') ? 'text-transit-blue' : 'text-transit-gray'}`} 
          onClick={() => navigate('/')}
        >
          <Info className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`bottom-tab ${isActive('/map') ? 'text-transit-blue' : 'text-transit-gray'}`} 
          onClick={() => navigate('/map')}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs mt-1">Map</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`bottom-tab ${isActive('/report') ? 'text-transit-blue' : 'text-transit-gray'}`} 
          onClick={() => navigate('/report')}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">Report</span>
        </Button>
        
        <Button 
          variant="ghost"
          className={`bottom-tab ${isActive('/alerts') ? 'text-transit-blue' : 'text-transit-gray'}`} 
          onClick={() => navigate('/alerts')}
        >
          <Bell className="h-5 w-5" />
          <span className="text-xs mt-1">Alerts</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
