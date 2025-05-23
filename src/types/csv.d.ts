
declare module "*.csv" {
  const content: string;
  export default content;
}

export interface SafetyIndexEntry {
  Date: string;
  safety_index: string;
}

export interface CrimeEntry {
  date: string;
  primary_type: string;
  count: string;
}

export interface TrafficCrashEntry {
  DATE: string;
  TOTAL_CRASHES: string;
  TOTAL_FATALITIES: string;
  TOTAL_INCAPACITATING_INJURIES: string;
  TOTAL_NON_INCAPACITATING_INJURIES: string;
}

export interface LineCountEntry {
  line_code: string;
  incident_count: string;
  risk_flag: string;
}

export interface ClosestStopEntry {
  closest_station: string;
  Line: string;
  location: string;
  crime_count: string;
  distance_from_northwestern_km: string;
}
