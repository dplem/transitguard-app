import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { allTransitPoints, Station } from '@/utils/safetyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import StationInfo from '@/components/StationInfo';
import SafetyMap from '@/components/SafetyMap';
import { MapPin, Search } from 'lucide-react';
import { parseCSV } from '@/utils/csvParser';
import { ClosestStopEntry } from '@/types/csv';

const Map = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [nearbyStations, setNearbyStations] = useState<ClosestStopEntry[]>([]);
  
  const filteredStations = searchQuery
    ? allTransitPoints.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const fetchNearbyStations = async () => {
      try {
        const response = await fetch('/data/closest_stops.csv');
        const csvText = await response.text();
        const parsedData = parseCSV<ClosestStopEntry>(csvText);
        setNearbyStations(parsedData);
      } catch (error) {
        console.error('Error fetching nearby stations data:', error);
      }
    };

    fetchNearbyStations();
  }, []);

  const getSafetyColor = (crimeCount: string) => {
    const count = parseInt(crimeCount);
    if (count === 0) return 'bg-safety-safe';
    if (count <= 5) return 'bg-yellow-400';
    return 'bg-orange-500';
  };
  
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
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Nearby Stations</h3>
            <ScrollArea className="h-64 w-full">
              <div className="space-y-2 pr-4">
                {nearbyStations.map((station, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg border p-3 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium">{station.closest_station}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">
                          {station.Line}
                        </p>
                        <p className="text-xs text-gray-500">
                          {station.crime_count} incidents
                        </p>
                      </div>
                    </div>
                    <div className={`
                      ${getSafetyColor(station.crime_count)} 
                      w-3 h-3 rounded-full`}
                    ></div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Map;
