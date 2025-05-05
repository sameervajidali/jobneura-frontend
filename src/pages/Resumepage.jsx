// ResumeEnhancer.jsx
import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

export default function ResumeEnhancer() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m your AI assistant. Paste your resume content or tell me how you\'d like to enhance it.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 20) return 'Good evening';
    return 'Good night';
  };

  const userName = 'Vajid Ali'; // Replace with dynamic user session if available

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/resume-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Something went wrong. Please try again later.' }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white text-xl font-semibold flex items-center gap-2">
        <Bot className="w-6 h-6" /> Resume Enhancer
      </div>
      <div className="px-6 pt-4 pb-2 bg-white text-sm text-gray-700">
        {`${getGreeting()}, ${userName} 👋 How are you today?`} <br />
        <span className="text-gray-800 font-medium">
          I’m your AI Teacher — here to help you write a job-winning resume.
        </span>
      </div>

      <div className="h-96 overflow-y-auto border-t border-gray-200 px-6 py-4 bg-gray-50 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 max-w-[75%] rounded-lg ${
              msg.role === 'bot' ? 'bg-blue-100 text-blue-900 self-start' : 'bg-gray-200 self-end ml-auto'
            }`}
          >
            <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">Analyzing...</p>}
      </div>

      <div className="bg-white px-6 py-4 border-t border-gray-200 flex gap-2">
        <textarea
          rows="2"
          className="flex-1 border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your request (e.g., Improve my summary, Add more impact to skills...)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <Send className="w-4 h-4 mr-1" /> Send
        </button>
      </div>
    </div>
  );
}
