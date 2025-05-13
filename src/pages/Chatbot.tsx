import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { getStationByName, getIncidentsByStationId } from '@/utils/safetyData';


const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm TransitGuard's assistant. How can I help you with transit safety today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  //Keyword-based response logic
  //Simple keyword matching for demo purposes, can be changed to a more sophisticated NLP model that also links station info for stats etc.
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
  
    // Try to extract station name from phrases like "Garfield", "show me Garfield", etc.
    const words = userInput.split(/\s+/);
    const possibleStation = words.find(word => getStationByName(word));
  
    // If user mentions a valid station name, provide detailed safety info
    if (possibleStation) {
      const station = getStationByName(possibleStation);
      if (station) {
        const incidents = getIncidentsByStationId(station.id);
        return `${station.name} is a ${station.type} station.\n` +
               `Safety Level: ${station.safetyLevel.toUpperCase()}\n` +
               `Prediction: ${station.prediction}\n` +
               `Recent Incidents: ${incidents.length}`;
      }
    }
  
    // Fallback keywords and responses
    if (input.includes("report")) {
      return "You can report an incident by going to the Report page or describing it here.";
    } else if (input.includes("safe") || input.includes("safety")) {
      return "Downtown stations are generally safest during weekday mornings. Would you like stats for a specific station?";
    } else if (input.includes("statistics") || input.includes("data")) {
      return "Sure, I can show you recent safety stats. Which station or line are you interested in?";
    } else if (input.includes("station")) {
      return "Please specify which station, and I can provide its safety record.";
    } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hi there! I'm here to help with your public transit safety questions.";
    } else if (input.includes("thank")) {
      return "You're welcome! Let me know if there's anything else I can help with.";
    } else {
      return "I'm still learning — could you ask that a different way or be more specific?";
    }
  };
  

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botReply = getBotResponse(input);
      setMessages(prev => [...prev, { text: botReply, isUser: false }]);
    }, 500);

    setInput('');
  };

  return (
    <Layout title="Safety Assistant" showBackButton onBack={() => window.history.back()}>
      <div className="flex flex-col h-[calc(100vh-180px)]">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about transit safety..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
