import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { generateCreativeResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from './Editable';

const NeonAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { content, isEditMode } = useContent();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with editable welcome message
    if (messages.length === 0) {
        setMessages([{ role: 'model', text: content.global.chatbotWelcome, timestamp: Date.now() }]);
    }
  }, [content.global.chatbotWelcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateCreativeResponse(userMsg.text);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-96 bg-void border border-cyan/30 rounded-lg shadow-neon-cyan flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gunmetal p-3 border-b border-cyan/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan animate-pulse" />
              <span className="font-orbitron font-bold text-cyan tracking-wider">
                <EditableText path="global.chatbotName" />
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-void/90 backdrop-blur-sm custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-cyan/10 border border-cyan/30 text-white rounded-br-none' 
                      : 'bg-magenta/10 border border-magenta/30 text-ice rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gunmetal p-2 rounded text-xs text-cyan animate-pulse">
                  Processing data stream...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-gunmetal border-t border-cyan/20 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about edits..."
              className="flex-1 bg-black/50 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-2 bg-cyan/20 text-cyan rounded hover:bg-cyan hover:text-black transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 rounded-full bg-void border-2 border-cyan shadow-neon-cyan hover:bg-cyan hover:text-black transition-all duration-300"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default NeonAssistant;