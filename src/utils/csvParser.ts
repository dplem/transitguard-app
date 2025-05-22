
/**
 * Parses a CSV string into an array of objects
 * @param csvContent The CSV content as a string
 * @returns Array of objects where each object represents a row in the CSV
 */
export const parseCSV = <T>(csvContent: string): T[] => {
  console.log("CSV content type:", typeof csvContent);
  
  if (!csvContent || typeof csvContent !== 'string') {
    console.error("Invalid CSV content provided:", csvContent);
    return [] as T[];
  }
  
  console.log("CSV content sample:", csvContent.substring(0, 100));
  
  // Split the CSV content by newline characters
  const lines = csvContent.trim().split('\n');
  
  if (lines.length === 0) {
    console.error("No lines found in CSV");
    return [] as T[];
  }
  
  console.log("Number of lines:", lines.length);
  console.log("Headers:", lines[0]);
  
  // Extract headers from the first line
  const headers = lines[0].split(',');
  
  // Parse the remaining lines into objects
  const result = lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim() as keyof T] = values[index] as unknown as T[keyof T];
      return obj;
    }, {} as T);
  });
  
  console.log("Parsed results sample:", result.slice(0, 2));
  return result;
};
