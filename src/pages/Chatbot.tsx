
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { queryTransitGuardAPI } from '@/services/chatbotService';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm TransitGuard's assistant. How can I help you with transit safety today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const examplePrompts = [
    "What are the stations near me?",
    "What are the total number of crimes today?",
    "What are the total number of traffic accidents today?",
    "What is the safest line in the last 7 days?"
  ];

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input;
    if (messageToSend.trim() === '' || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: messageToSend, isUser: true }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Query the real API
      const response = await queryTransitGuardAPI(messageToSend);
      
      // Add bot response
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { 
        text: 'I apologize, but I encountered an error processing your request. Please try again.', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
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
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg rounded-tl-none p-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          
          {messages.length === 1 && !isLoading && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">Try these example questions:</p>
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={isLoading}
                  className="block w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage()} 
              size="icon"
              disabled={isLoading || input.trim() === ''}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
