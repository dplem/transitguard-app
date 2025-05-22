
declare module '@/data/safety_index.csv' {
  const data: {
    Date: string;
    safety_index: string;
  }[];
  export default data;
}

declare module '@/data/july_2024_crime_summary.csv' {
  const data: {
    date: string;
    primary_type: string;
    count: string;
  }[];
  export default data;
}

declare module '@/data/traffic_crash_daily_totals_july_2024.csv' {
  const data: {
    DATE: string;
    TOTAL_CRASHES: string;
    TOTAL_FATALITIES: string;
    TOTAL_INCAPACITATING_INJURIES: string;
    TOTAL_NON_INCAPACITATING_INJURIES: string;
  }[];
  export default data;
}

declare module '@/data/line_counts.csv' {
  const data: {
    line_code: string;
    incident_count: string;
    risk_flag: 'High' | 'Medium' | 'Low';
  }[];
  export default data;
}
