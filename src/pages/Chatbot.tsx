
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm TransitGuard's assistant. How can I help you with transit safety today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const examplePrompts = [
    "What are the stations near me?",
    "What are the total number of crimes today?",
    "What are the total number of traffic accidents today?",
    "What is the safest line in the last 7 days?"
  ];

  const handleSendMessage = (messageText?: string) => {
    const messageToSend = messageText || input;
    if (messageToSend.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: messageToSend, isUser: true }]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you find information about safe transit routes.",
        "Would you like to see safety statistics for specific stations?",
        "I can show you safety predictions for your commute.",
        "Need to report an incident? I can help you with that.",
        "The safest time to travel through downtown stations is typically between 7am-10am."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
    
    setInput('');
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
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
          
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">Try these example questions:</p>
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="block w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
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
            <Button onClick={() => handleSendMessage()} size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
