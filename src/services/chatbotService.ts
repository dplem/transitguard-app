
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);
    
    return data.answer || 'I apologize, but I could not find a specific answer to your question.';
    
  } catch (error) {
    console.error('Error querying TransitGuard API:', error);
    return 'I apologize, but I am currently unable to process your request. Please try again later.';
  }
};
