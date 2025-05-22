
declare module "*.csv" {
  const content: any[];
  export default content;
}

interface SafetyIndexData {
  Date: string;
  safety_index: string;
}

interface CrimeData {
  date: string;
  primary_type: string;
  count: string;
}

interface TrafficCrashData {
  DATE: string;
  TOTAL_CRASHES: string;
  TOTAL_FATALITIES: string;
  TOTAL_INCAPACITATING_INJURIES: string;
  TOTAL_NON_INCAPACITATING_INJURIES: string;
}

interface LineCountData {
  line_code: string;
  incident_count: string;
  risk_flag: "High" | "Medium" | "Low";
}
