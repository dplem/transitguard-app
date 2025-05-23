
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { allTransitPoints, Station } from '@/utils/safetyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StationInfo from '@/components/StationInfo';
import SafetyMap from '@/components/SafetyMap';
import { MapPin, Search } from 'lucide-react';

const Map = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  
  const filteredStations = searchQuery
    ? allTransitPoints.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  return (
    <Layout title="Safety Map" showBackButton={selectedStation !== null} onBack={() => setSelectedStation(null)}>
      {selectedStation ? (
        <StationInfo station={selectedStation} />
      ) : (
        <>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search stations or bus stops"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <SafetyMap />
          
          {searchQuery && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">
                {filteredStations.length} results found
              </h3>
              <div className="space-y-2">
                {filteredStations.map(station => (
                  <div 
                    key={station.id}
                    className="bg-white rounded-lg border p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedStation(station)}
                  >
                    <div>
                      <h3 className="font-medium">{station.name}</h3>
                      <p className="text-sm text-gray-500">
                        {station.type === 'train' ? 'L Station' : 'Bus Stop'}
                      </p>
                    </div>
                    <div className={`
                      ${station.safetyLevel === 'safe' ? 'bg-safety-safe' : 
                        station.safetyLevel === 'warning' ? 'bg-yellow-400' : 
                        'bg-orange-500'} 
                      w-3 h-3 rounded-full`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-2 mt-4">
            <h3 className="text-sm font-medium">Nearby Stations</h3>
            {allTransitPoints.slice(0, 5).map(station => (
              <div 
                key={station.id}
                className="bg-white rounded-lg border p-3 flex items-center justify-between cursor-pointer"
                onClick={() => setSelectedStation(station)}
              >
                <div>
                  <h3 className="font-medium">{station.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">
                      {station.type === 'train' ? 'L Station' : 'Bus Stop'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {station.incidents} incidents
                    </p>
                  </div>
                </div>
                <div className={`
                  ${station.safetyLevel === 'safe' ? 'bg-safety-safe' : 
                    station.safetyLevel === 'warning' ? 'bg-yellow-400' : 
                    'bg-orange-500'} 
                  w-3 h-3 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Map;
