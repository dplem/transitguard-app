export type SafetyLevel = 'safe' | 'warning' | 'danger';

export interface Station {
  id: string;
  name: string;
  type: 'train' | 'bus';
  safetyLevel: SafetyLevel;
  lat: number;
  lng: number;
  incidents: number;
  prediction: string;
}

export interface Incident {
  id: string;
  type: string;
  description: string;
  location: string;
  stationId: string;
  timestamp: string;
  reportedBy: string;
  status: 'reported' | 'investigating' | 'resolved';
}

export interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  stationId: string;
  timestamp: string;
  level: SafetyLevel;
  isRead: boolean;
}

// Mock CTA Train Stations (L stations)
export const stations: Station[] = [
  {
    id: '1',
    name: 'Clark/Lake',
    type: 'train',
    safetyLevel: 'safe',
    lat: 41.8858,
    lng: -87.6307,
    incidents: 3,
    prediction: 'Low risk expected during evening hours'
  },
  {
    id: '2',
    name: 'O\'Hare',
    type: 'train',
    safetyLevel: 'safe',
    lat: 41.9797,
    lng: -87.9006,
    incidents: 2,
    prediction: 'Very low risk throughout the day'
  },
  {
    id: '3',
    name: '95th/Dan Ryan',
    type: 'train',
    safetyLevel: 'warning',
    lat: 41.7222,
    lng: -87.6246,
    incidents: 12,
    prediction: 'Moderate risk between 10pm-1am'
  },
  {
    id: '4',
    name: 'Belmont',
    type: 'train',
    safetyLevel: 'warning',
    lat: 41.9392,
    lng: -87.6534,
    incidents: 8,
    prediction: 'Increased risk on weekends after 11pm'
  },
  {
    id: '5',
    name: 'Garfield',
    type: 'train',
    safetyLevel: 'danger',
    lat: 41.7953,
    lng: -87.6186,
    incidents: 23,
    prediction: 'High risk area, especially after dark'
  },
  {
    id: '6',
    name: 'Jackson',
    type: 'train',
    safetyLevel: 'safe',
    lat: 41.8781,
    lng: -87.6298,
    incidents: 5,
    prediction: 'Generally safe with occasional incidents'
  },
  {
    id: '7',
    name: 'Western (Blue)',
    type: 'train',
    safetyLevel: 'warning',
    lat: 41.9152,
    lng: -87.6873,
    incidents: 11,
    prediction: 'Exercise caution after 9pm'
  },
  {
    id: '8',
    name: 'Chicago (Red)',
    type: 'train',
    safetyLevel: 'warning',
    lat: 41.8963,
    lng: -87.6306,
    incidents: 14,
    prediction: 'Risk increases on weekends'
  },
  {
    id: '9',
    name: 'Addison (Red)',
    type: 'train',
    safetyLevel: 'safe',
    lat: 41.9474,
    lng: -87.6535,
    incidents: 4,
    prediction: 'Increased security during events'
  },
  {
    id: '10',
    name: 'Howard',
    type: 'train',
    safetyLevel: 'danger',
    lat: 42.0188,
    lng: -87.6726,
    incidents: 19,
    prediction: 'High risk area especially after 8pm'
  }
];

// Mock Bus Stops
export const busStops: Station[] = [
  {
    id: 'b1',
    name: 'Michigan & Adams',
    type: 'bus',
    safetyLevel: 'safe',
    lat: 41.8794,
    lng: -87.6243,
    incidents: 1,
    prediction: 'Very low risk area'
  },
  {
    id: 'b2',
    name: 'Western & Milwaukee',
    type: 'bus',
    safetyLevel: 'warning',
    lat: 41.9161,
    lng: -87.6873,
    incidents: 7,
    prediction: 'Exercise caution during late hours'
  },
  {
    id: 'b3',
    name: 'Ashland & 63rd',
    type: 'bus',
    safetyLevel: 'danger',
    lat: 41.7795,
    lng: -87.6644,
    incidents: 16,
    prediction: 'High risk area, especially after dark'
  },
  {
    id: 'b4',
    name: 'Madison & Pulaski',
    type: 'bus',
    safetyLevel: 'danger',
    lat: 41.8815,
    lng: -87.7268,
    incidents: 18,
    prediction: 'High risk throughout evening hours'
  },
  {
    id: 'b5',
    name: 'State & Lake',
    type: 'bus',
    safetyLevel: 'safe',
    lat: 41.8858,
    lng: -87.6276,
    incidents: 2,
    prediction: 'Well monitored area, generally safe'
  },
  {
    id: 'b6',
    name: 'Clark & Devon',
    type: 'bus',
    safetyLevel: 'warning',
    lat: 41.9981,
    lng: -87.6690,
    incidents: 9,
    prediction: 'Exercise caution during late hours'
  }
];

// All stations and bus stops combined
export const allTransitPoints = [...stations, ...busStops];

// Mock incidents
export const incidents: Incident[] = [
  {
    id: 'inc1',
    type: 'Theft',
    description: 'Phone snatching reported on platform',
    location: 'Platform near south entrance',
    stationId: '5',
    timestamp: '2023-05-08T14:23:00',
    reportedBy: 'Commuter',
    status: 'investigating'
  },
  {
    id: 'inc2',
    type: 'Assault',
    description: 'Verbal altercation escalated to physical',
    location: 'Near turnstiles',
    stationId: '10',
    timestamp: '2023-05-08T18:45:00',
    reportedBy: 'CTA Staff',
    status: 'investigating'
  },
  {
    id: 'inc3',
    type: 'Suspicious Package',
    description: 'Unattended backpack',
    location: 'Platform bench',
    stationId: '3',
    timestamp: '2023-05-08T10:15:00',
    reportedBy: 'Security Camera',
    status: 'resolved'
  },
  {
    id: 'inc4',
    type: 'Harassment',
    description: 'Individual harassing passengers',
    location: 'Bus rear section',
    stationId: 'b3',
    timestamp: '2023-05-08T13:30:00',
    reportedBy: 'Bus Driver',
    status: 'resolved'
  },
  {
    id: 'inc5',
    type: 'Vandalism',
    description: 'Graffiti in progress',
    location: 'Station exterior wall',
    stationId: '7',
    timestamp: '2023-05-08T02:20:00',
    reportedBy: 'Security Camera',
    status: 'reported'
  }
];

// Mock safety alerts
export const alerts: SafetyAlert[] = [
  {
    id: 'a1',
    title: 'Increased Security',
    description: 'Additional security personnel deployed at Howard station due to recent incidents',
    stationId: '10',
    timestamp: '2024-07-10T08:00:00',
    level: 'warning',
    isRead: false
  },
  {
    id: 'a2',
    title: 'Service Disruption',
    description: 'Red Line trains bypassing Garfield due to police activity',
    stationId: '5',
    timestamp: '2024-07-12T15:30:00',
    level: 'danger',
    isRead: false
  },
  {
    id: 'a3',
    title: 'Community Outreach',
    description: 'CTA hosting safety awareness event at 95th/Dan Ryan station on Saturday',
    stationId: '3',
    timestamp: '2024-07-08T09:00:00',
    level: 'safe',
    isRead: true
  }
];

// Utility functions to get data
export const getStationById = (id: string): Station | undefined => {
  return allTransitPoints.find(station => station.id === id);
};

export const getIncidentsByStationId = (stationId: string): Incident[] => {
  return incidents.filter(incident => incident.stationId === stationId);
};

export const getAlertsByStationId = (stationId: string): SafetyAlert[] => {
  return alerts.filter(alert => alert.stationId === stationId);
};

export const getSafetyLevelClass = (level: SafetyLevel): string => {
  switch (level) {
    case 'safe':
      return 'safety-rating-safe';
    case 'warning':
      return 'safety-rating-warning';
    case 'danger':
      return 'safety-rating-danger';
    default:
      return 'safety-rating-safe';
  }
};

export const getSafetyLevelText = (level: SafetyLevel): string => {
  switch (level) {
    case 'safe':
      return 'Safe';
    case 'warning':
      return 'Exercise Caution';
    case 'danger':
      return 'High Risk';
    default:
      return 'Unknown';
  }
};

export const getNearbyStations = (lat: number, lng: number, radius: number = 5): Station[] => {
  // This is a very simple implementation for demo purposes
  // In a real app, we would use proper geolocation calculations
  return allTransitPoints.slice(0, 5);
};
