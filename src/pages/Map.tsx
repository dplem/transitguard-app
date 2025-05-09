
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { allTransitPoints, Station } from '@/utils/safetyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StationInfo from '@/components/StationInfo';
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
          
          <div className="w-full rounded-lg bg-gray-100 overflow-hidden mb-4">
            <div className="p-6 flex flex-col items-center justify-center h-64">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Safety Map</h3>
                <p className="text-sm text-gray-500">
                  Interactive map view available in the full app
                </p>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <div className="bg-safety-safe w-3 h-3 rounded-full"></div>
                <div className="bg-safety-warning w-3 h-3 rounded-full"></div>
                <div className="bg-safety-danger w-3 h-3 rounded-full"></div>
              </div>
              
              <Button variant="outline" size="sm">
                <MapPin className="mr-2 h-4 w-4" />
                Use My Location
              </Button>
            </div>
          </div>
          
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
                        station.safetyLevel === 'warning' ? 'bg-safety-warning' : 
                        'bg-safety-danger'} 
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
                    station.safetyLevel === 'warning' ? 'bg-safety-warning' : 
                    'bg-safety-danger'} 
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
