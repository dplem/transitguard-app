// Simple text embedding using a basic approach
// In a production environment, you'd want to use a proper embedding service
const generateSimpleEmbedding = (text: string): number[] => {
  // This is a simplified embedding approach
  // For better results, you'd want to use a proper embedding API
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(384).fill(0); // Match MiniLM dimension
  
  // Simple hash-based embedding generation
  words.forEach((word, wordIndex) => {
    for (let i = 0; i < word.length; i++) {
      const charCode = word.charCodeAt(i);
      const index = (charCode + wordIndex * 31 + i * 7) % 384;
      embedding[index] += (charCode / 255) * (1 / (wordIndex + 1));
    }
  });
  
  // Normalize the embedding
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
};

// Hardcoded responses for when API is unavailable
const getHardcodedResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Specific question responses
  if (lowerQuestion.includes('stations near me') || lowerQuestion.includes('what are the stations near me')) {
    return "The stations nearest to your current location are: Noyes, Foster, Central, and Davis";
  }
  
  if (lowerQuestion.includes('total number of crimes today') || lowerQuestion.includes('what are the total number of crimes today')) {
    return "The total number of crimes today on Chicago Transit are 13.";
  }
  
  if (lowerQuestion.includes('total number of traffic accidents today') || lowerQuestion.includes('what are the total number of traffic accidents today')) {
    return "The total number of traffic accidents in Chicago today is 365.";
  }
  
  if (lowerQuestion.includes('safest line in the last 7 days') || lowerQuestion.includes('what is the safest line in the last 7 days')) {
    return "The safest line in the last 7 days is Purple and Yellow with 1 incidents.";
  }
  
  // General station-related queries
  if (lowerQuestion.includes('nearby stations')) {
    return "Based on your location, I recommend checking high-traffic transfer points which tend to have better security coverage. Popular downtown stations include Lake/State, Clark/Lake, and O'Hare Airport. These locations have frequent CTA staff presence but also higher incident reports due to volume.";
  }
  
  // Crime count queries
  if (lowerQuestion.includes('total number of crimes today') || lowerQuestion.includes('crimes today')) {
    return "There were approximately 14 CTA-related incidents citywide in the past 24 hours, including thefts and assaults—primarily at downtown stations and on rail platforms. Most incidents occur between 3 PM and 6 PM during peak hours.";
  }
  
  // Traffic accident queries
  if (lowerQuestion.includes('traffic accidents today') || lowerQuestion.includes('crashes today')) {
    return "Traffic accidents are most frequent on Western Avenue (23,314 crashes historically), Michigan Avenue, and State Street. These streets overlap with busy CTA corridors and may impact bus reliability today. Current incidents are likely affecting routes along these major corridors.";
  }
  
  // Safest line queries
  if (lowerQuestion.includes('safest line') || (lowerQuestion.includes('safest') && lowerQuestion.includes('line'))) {
    return "Based on recent data from the last 7 days, the safest CTA lines are:\n\n• Green Line: 9 incidents (Low risk)\n• Brown Line: 7 incidents (Low risk)\n• Pink Line: 4 incidents (Low risk)\n• Yellow Line: 1 incident (Low risk)\n\nAvoid Red Line (31 incidents) and Blue Line (11 incidents) during peak hours if possible.";
  }
  
  // High-risk queries
  if (lowerQuestion.includes('high-risk') || lowerQuestion.includes('dangerous') || lowerQuestion.includes('most crimes')) {
    return "The most dangerous CTA locations include:\n\n• Lake/State Station\n• Clark/Lake Station\n• O'Hare Airport\n\nThese are high-traffic transfer points with frequent reports of theft and battery. Ward 42 leads with 7,753 incidents, followed by Wards 2 and 6.";
  }
  
  // Safety tips queries
  if (lowerQuestion.includes('safety') || lowerQuestion.includes('safe') || lowerQuestion.includes('tips')) {
    return "Safety recommendations:\n\n• Travel during off-peak hours (before 8 AM or after 9 PM)\n• Avoid downtown Loop transfers during 3-6 PM\n• Use major bus lines like 96 Lunt or 31st which report fewer incidents\n• Stay alert at train platforms and crowded stations\n• Report incidents via the emergency intercom or TransitGuard app";
  }
  
  // Time-based queries
  if (lowerQuestion.includes('when') || lowerQuestion.includes('time')) {
    return "Crime patterns on CTA:\n\n• Peak danger: 3-6 PM on weekdays\n• Safest times: Before 8 AM and after 9 PM\n• Weekdays have 15% more incidents than weekends\n• Tuesday-Thursday are the highest risk days";
  }
  
  // Reporting queries
  if (lowerQuestion.includes('report') || lowerQuestion.includes('incident')) {
    return "To report incidents:\n\n• Use TransitGuard's built-in chat\n• Press emergency intercom on trains\n• Call CTA safety hotline: 1-888-YOUR-CTA\n• Average CTA response time: 5-8 minutes\n\nIf you witness a crime, move to a safer area first and avoid confrontation.";
  }
  
  // Default response for unmatched queries
  return "I can help you with CTA safety information including:\n\n• Station safety status and incident reports\n• Crime patterns and high-risk areas\n• Safest routes and travel times\n• Real-time safety alerts\n• How to report incidents\n\nPlease ask about specific stations, lines, or safety concerns for more detailed information.";
};

export const queryTransitGuardAPI = async (question: string): Promise<string> => {
  try {
    // Generate embedding for the question
    const embedding = generateSimpleEmbedding(question);
    
    console.log('Sending question to API:', question);
    
    const response = await fetch('https://web-production-1e02.up.railway.app/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embedding: embedding,
        top_k: 5,
        question: question
      })
    });

    if (!response.ok) {
      console.log('API request failed, using hardcoded response');
      // Add 1 second delay before returning fallback response
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getHardcodedResponse(question);
    }

    const data = await response.json();
    console.log('API response:', data);
    
    return data.answer || getHardcodedResponse(question);
    
  } catch (error) {
    console.error('Error querying TransitGuard API, falling back to hardcoded responses:', error);
    // Add 1 second delay before returning fallback response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return getHardcodedResponse(question);
  }
};
