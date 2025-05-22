
/**
 * Parses a CSV string into an array of objects
 * @param csvContent The CSV content as a string
 * @returns Array of objects where each object represents a row in the CSV
 */
export const parseCSV = <T>(csvContent: string): T[] => {
  // Split the CSV content by newline characters
  const lines = csvContent.trim().split('\n');
  
  // Extract headers from the first line
  const headers = lines[0].split(',');
  
  // Parse the remaining lines into objects
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header as keyof T] = values[index] as unknown as T[keyof T];
      return obj;
    }, {} as T);
  });
};
