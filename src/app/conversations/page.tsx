'use client'

import { useState, useEffect, useRef } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon,
  FaceSmileIcon,
  PhotoIcon,
  MicrophoneIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  LightBulbIcon,
  XMarkIcon,
  Bars3Icon,
  BellIcon,
  PlusIcon,
  CheckCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState as useReactState } from 'react'
import React from 'react'

const conversations = [
  {
    id: 1,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    lastMessage: 'I need help with my subscription',
    time: '2m ago',
    unread: true,
    status: 'online',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=E0E7EF&color=374151&size=64',
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    lastMessage: 'Thanks for your help!',
    time: '1h ago',
    unread: false,
    status: 'offline',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=E0E7EF&color=374151&size=64',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    lastMessage: 'Can you explain the new features?',
    time: '3h ago',
    unread: true,
    status: 'online',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Thompson&background=E0E7EF&color=374151&size=64',
  },
  {
    id: 4,
    name: 'David Chen',
    email: 'david.chen@example.com',
    lastMessage: 'I\'ve attached the screenshot of the error',
    time: '5h ago',
    unread: false,
    status: 'away',
    avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=E0E7EF&color=374151&size=64',
  },
]

const messages = [
  {
    id: 1,
    sender: 'user',
    content: 'Hi, I need help with my subscription. I\'m trying to upgrade to the premium plan but I\'m having trouble with the payment.',
    time: '2:30 PM',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=E0E7EF&color=374151&size=64',
  },
  {
    id: 2,
    sender: 'agent',
    content: 'Hello Sarah! I\'d be happy to help you with your subscription upgrade. Could you please let me know what specific issue you\'re encountering with the payment?',
    time: '2:31 PM',
    avatar: 'https://ui-avatars.com/api/?name=Support&background=E0E7EF&color=374151&size=64',
  },
  {
    id: 3,
    sender: 'user',
    content: 'I\'m getting an error message saying "Payment declined" even though my card has sufficient funds.',
    time: '2:32 PM',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=E0E7EF&color=374151&size=64',
  },
  {
    id: 4,
    sender: 'agent',
    content: 'I understand. Let me help you troubleshoot this. Could you please try these steps:\n1. Clear your browser cache\n2. Try using a different browser\n3. Make sure your card details are entered correctly',
    time: '2:33 PM',
    avatar: 'https://ui-avatars.com/api/?name=Support&background=E0E7EF&color=374151&size=64',
  },
]

const quickReplies = [
  "I'll help you with that",
  'Could you provide more details?',
  'Let me check that for you',
  'I understand your concern',
  'Is there anything else I can assist with?',
  'Thanks for your patience',
]

// AI suggestions
const aiSuggestions = [
  "How can I upgrade my subscription plan?",
  "What are the benefits of premium membership?",
  "How do I update my payment method?",
  "Can I get a refund for my last payment?",
  "What's included in the enterprise plan?",
  "How do I cancel my subscription?"
];

// AI answers for demonstration
const aiAnswers = {
  "How can I upgrade my subscription plan?": 
    "To upgrade your subscription plan:\n1. Go to Account Settings\n2. Select 'Subscription'\n3. Choose your desired plan\n4. Click 'Upgrade Now'\n5. Follow the payment process\n\nYour new plan will be activated immediately after payment confirmation.",
  
  "What are the benefits of premium membership?": 
    "Premium membership includes:\n• Unlimited conversations\n• Advanced analytics\n• Priority customer support\n• Custom branding options\n• Integration with 50+ platforms\n• Team collaboration features\n• Access to exclusive webinars",
  
  "How do I update my payment method?": 
    "To update your payment method:\n1. Navigate to Account Settings\n2. Go to 'Billing Information'\n3. Select 'Payment Methods'\n4. Click 'Add New' or 'Edit' existing\n5. Enter your new card details\n6. Save changes\n\nYour next billing cycle will use the updated payment method.",
  
  "Can I get a refund for my last payment?": 
    "Yes, you may be eligible for a refund. Our refund policy states:\n\n• Full refunds available within 14 days of purchase\n• Partial refunds may be issued within 30 days\n• Special circumstances are evaluated on a case-by-case basis\n\nPlease contact our billing department with your account details and reason for the refund request.",
  
  "What's included in the enterprise plan?": 
    "The Enterprise Plan includes everything in Premium plus:\n\n• Dedicated account manager\n• Custom API access\n• Advanced security features\n• 99.9% uptime SLA\n• Custom integration development\n• On-premise deployment options\n• Unlimited team members\n• Personalized training sessions",
  
  "How do I cancel my subscription?": 
    "To cancel your subscription:\n\n1. Go to Account Settings\n2. Select 'Subscription'\n3. Click 'Cancel Subscription'\n4. Select a reason for cancelling\n5. Confirm cancellation\n\nNote: You'll maintain access until the end of your current billing period. No partial refunds are provided for unused time."
};

const ACCENT = 'emerald'; // Use emerald as the accent color
const BG_LIGHT = '#f5f6fa';
const CARD_BG = 'white';
const SIDEBAR_BG = '#f8fafc';
const BORDER_COLOR = '#e5e7eb';

// 1. Extract the AI Assistant sidebar content into a component
interface AiAssistantSidebarProps {
  aiConversation: Array<{ role: 'user' | 'assistant'; content: string; time: string }>;
  isAiTyping: boolean;
  aiTypingText: string;
  aiChatRef: React.RefObject<HTMLDivElement>;
  aiSuggestions: string[];
  handleAiQuestionSelect: (question: keyof typeof aiAnswers) => void;
}

const AiAssistantSidebar: React.FC<AiAssistantSidebarProps> = ({ aiConversation, isAiTyping, aiTypingText, aiChatRef, aiSuggestions, handleAiQuestionSelect }) => {
  return (
    <div className="flex flex-col h-full flex-1 min-h-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative group">
          <Image src="https://ui-avatars.com/api/?name=AI+Assistant&background=E0E7EF&color=374151&size=64" alt="AI Assistant" width={48} height={48} className="rounded-full border-2 border-blue-200 shadow group-hover:shadow-blue-300 group-hover:scale-110 transition-all duration-200" />
          <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-blue-800 drop-shadow">Maya</h2>
          <span className="text-xs text-blue-400">AI Assistant</span>
        </div>
      </div>
      {/* Chat history area is scrollable and flex-1 */}
      <div ref={aiChatRef} className="flex-1 min-h-0 bg-white/80 rounded-2xl shadow p-4 mb-2 overflow-y-auto flex flex-col relative">
        <div className="space-y-3">
          {aiConversation.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] px-6 py-4 rounded-xl text-sm shadow ${msg.role === 'user' ? 'bg-white/90 text-gray-900 ml-auto border border-emerald-100' : 'bg-indigo-50/80 text-gray-900 mr-auto border border-blue-100'}`}>
                <span className="whitespace-pre-line">{msg.content}</span>
                <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
              </div>
            </motion.div>
          ))}
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-xl text-sm shadow bg-indigo-50/80 text-gray-900 mr-auto border border-blue-100 animate-pulse">
                <span className="whitespace-pre-line">{aiTypingText}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Suggestions and footer are sticky at the bottom */}
      <div className="flex flex-col gap-1 sticky bottom-0 z-10 pt-2 pb-1 bg-gradient-to-br from-indigo-100 via-blue-200 to-emerald-100 bg-opacity-90 rounded-xl shadow-inner">
        <div className="w-full mb-2">
          <select
            className="w-full rounded-full border border-blue-200 bg-white/40 backdrop-blur-md px-4 py-2 text-sm text-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            defaultValue=""
            onChange={e => {
              if (e.target.value) handleAiQuestionSelect(e.target.value as keyof typeof aiAnswers);
              e.target.selectedIndex = 0;
            }}
          >
            <option value="" disabled>Choose a suggestion...</option>
            {aiSuggestions.map((q: string, i: number) => (
              <option key={i} value={q}>{q}</option>
            ))}
          </select>
        </div>
        <div className="text-xs text-blue-900 text-center font-semibold drop-shadow">Powered by BeyondChats AI</div>
      </div>
    </div>
  );
};

export default function ConversationsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(1); // Default to first conversation
  const [isTyping, setIsTyping] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);
  const [aiActive, setAiActive] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [localMessages, setLocalMessages] = useState<typeof messages>([...messages]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiConversation, setAiConversation] = useState<Array<{ role: 'user' | 'assistant'; content: string; time: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Maya, your AI assistant. I can help you manage conversations and provide insights. What would you like to know?',
      time: '2:30 PM'
    }
  ]);
  const aiChatRef = useRef<HTMLDivElement | null>(null);
  const [aiTypingText, setAiTypingText] = useReactState('');
  const [search, setSearch] = useState('');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileAI, setShowMobileAI] = useState(false);
  const [aiMinimized, setAiMinimized] = useState(false);
  
  // Check window size for responsiveness
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Simulate typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  useEffect(() => {
    if (aiChatRef.current) {
      aiChatRef.current.scrollTop = aiChatRef.current.scrollHeight;
    }
  }, [aiConversation.length, isAiTyping]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileView = () => {
    setShowMobileList(!showMobileList);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageInput,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=E0E7EF&color=374151&size=64',
    };
    
    setLocalMessages(prev => [...prev, newUserMessage]);
    setMessageInput('');
    setIsTyping(true);
    
    // Simulate agent response after delay
    setTimeout(() => {
      setIsTyping(false);
      setLocalMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          content: "Thank you for providing that information. I've forwarded this to our technical team and they'll look into it right away. In the meantime, could you try using a different payment method?",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          avatar: 'https://ui-avatars.com/api/?name=Support&background=E0E7EF&color=374151&size=64',
        }
      ]);
    }, 3000);
  };

  const handleAiQuestionSelect = (question: keyof typeof aiAnswers) => {
    setSelectedQuestion(question);
    setAiResponse('');
    
    // Add user question to AI conversation
    setAiConversation(prev => [
      ...prev,
      {
        role: 'user',
        content: question,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }
    ]);
    
    // Simulate AI typing
    setIsAiTyping(true);
    setAiTypingText('');
    setTimeout(() => {
      setIsAiTyping(false);
      setAiConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: aiAnswers[question],
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
    }, 1500);
  };
  
  const handleAiMessageSend = () => {
    if (!aiInputText.trim()) return;
    
    // Add user message to AI conversation
    setAiConversation(prev => [
      ...prev,
      {
        role: 'user',
        content: aiInputText,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }
    ]);
    
    setAiInputText('');
    setIsAiTyping(true);
    setAiTypingText('');
    
    // Simulate AI response
    setTimeout(() => {
      setIsAiTyping(false);
      setAiConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm analyzing this conversation. Based on what I see, Sarah is having payment issues with her subscription upgrade. The team is helping troubleshoot the problem by suggesting browser cache clearing and checking card details.",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
    }, 2000);
  };
  
  // Typing effect for AI assistant
  useEffect(() => {
    if (isAiTyping) {
      // Find the last user message
      let lastUserMsg = aiConversation.filter(m => m.role === 'user').slice(-1)[0];
      let answer = lastUserMsg ? aiAnswers[lastUserMsg.content as keyof typeof aiAnswers] : "";
      if (!answer) answer = "I'm analyzing this conversation. Based on what I see, Sarah is having payment issues with her subscription upgrade. The team is helping troubleshoot the problem by suggesting browser cache clearing and checking card details.";
      let i = 0;
      setAiTypingText('');
      const interval = setInterval(() => {
        setAiTypingText(prev => {
          if (i < answer.length) {
            i++;
            return answer.slice(0, i);
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 18);
      return () => clearInterval(interval);
    } else {
      setAiTypingText('');
    }
  }, [isAiTyping]);
  
  return (
    <DashboardLayout>
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white/80 shadow sticky top-0 z-30">
        <button onClick={() => setShowMobileSidebar(true)} className="p-2 rounded-full bg-white/80 shadow border border-gray-200">
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
        <span className="font-bold text-lg text-gray-900">Inbox</span>
        <button onClick={() => setShowMobileAI(true)} className="p-2 rounded-full bg-white/80 shadow border border-gray-200">
          <SparklesIcon className="h-6 w-6 text-indigo-500" />
        </button>
      </div>
      {/* Animated gradient background and accent circle */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-blue-50 to-emerald-100 animate-gradient-move">
        <div className="absolute left-1/3 top-1/4 w-[600px] h-[600px] bg-emerald-200 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      <div className="flex md:flex-row flex-col h-[calc(100vh-7rem)] w-full min-h-[600px] font-sans relative">
        {/* Mobile Sidebar Drawer */}
        {showMobileSidebar && (
          <div className="fixed inset-0 z-40 bg-black/40 flex">
            <div className="w-4/5 max-w-xs bg-white/90 h-full shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <span className="font-bold text-lg">Inbox</span>
                <button onClick={() => setShowMobileSidebar(false)} className="p-2"><XMarkIcon className="h-6 w-6 text-gray-700" /></button>
              </div>
              {/* Sidebar content (reuse) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-white/20">
                {conversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((c) => (
                  <div key={c.id} className={`flex items-center gap-3 px-6 py-5 cursor-pointer transition group relative ${selectedConversation === c.id ? 'bg-white/80 border-l-4 border-gradient-to-b from-emerald-400 via-blue-400 to-indigo-400 shadow-lg scale-[1.03]' : 'hover:bg-white/60 hover:scale-105'} duration-200`}
                    onClick={() => setSelectedConversation(c.id)}
                    title={c.email}
                  >
                    <div className="relative">
                      <Image src={c.avatar} alt={c.name} width={44} height={44} className="h-11 w-11 object-cover rounded-full border-2 border-white/60 shadow-md group-hover:shadow-xl transition-all duration-200" />
                      <span className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white ${c.status === 'online' ? 'bg-emerald-400 animate-pulse' : c.status === 'away' ? 'bg-yellow-400' : 'bg-gray-300'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate">{c.name}</span>
                        {c.status === 'online' && <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse inline-block" />}
                        {c.status === 'away' && <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block" />}
                      </div>
                      <span className="block text-xs text-gray-500 truncate">{c.lastMessage}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-400">{c.time}</span>
                      {c.unread && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                    </div>
                  </div>
                ))}
              </div>
              {/* Floating New Customer Button */}
              <button className="absolute bottom-8 right-8 z-10 bg-gradient-to-br from-emerald-400 via-blue-400 to-indigo-400 text-white rounded-full p-4 shadow-xl hover:scale-110 transition-all duration-200 border-4 border-white/60 backdrop-blur-xl">
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1" onClick={() => setShowMobileSidebar(false)} />
          </div>
        )}
        {/* Mobile AI Drawer */}
        {showMobileAI && (
          <div className="fixed inset-0 z-40 bg-black/40 flex justify-end">
            <div className="w-4/5 max-w-xs bg-white/90 h-full shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <span className="font-bold text-lg">AI Assistant</span>
                <button onClick={() => setShowMobileAI(false)} className="p-2"><XMarkIcon className="h-6 w-6 text-gray-700" /></button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <AiAssistantSidebar
                  aiConversation={aiConversation}
                  isAiTyping={isAiTyping}
                  aiTypingText={aiTypingText}
                  aiChatRef={aiChatRef}
                  aiSuggestions={aiSuggestions}
                  handleAiQuestionSelect={handleAiQuestionSelect}
                />
              </div>
            </div>
            <div className="flex-1" onClick={() => setShowMobileAI(false)} />
          </div>
        )}
        {/* Main layout for md+ screens */}
        <aside className="hidden md:flex w-80 min-w-[18rem] max-w-xs h-full flex-col gap-0 bg-transparent">
          <div className="flex flex-col h-full bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden transition-all duration-300">
            {/* Sidebar Header */}
            <div className="px-6 py-5 border-b border-white/30 flex items-center justify-between bg-white/70 backdrop-blur-xl">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Inbox</h2>
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">{conversations.filter(c => c.unread).length} unread</span>
            </div>
            {/* Sidebar Search */}
            <div className="relative px-6 py-3 bg-white/60 border-b border-white/20">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-8 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-full pl-10 pr-8 py-2 bg-white/40 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:bg-white/80 transition-all text-sm shadow"
                placeholder="Search..."
              />
              {search && (
                <button type="button" className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setSearch('')}><XMarkIcon className="h-5 w-5" /></button>
              )}
            </div>
            {/* Sidebar List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-white/20 bg-transparent">
              {conversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((c) => (
                <div key={c.id} className={`flex items-center gap-3 px-6 py-5 cursor-pointer transition group relative ${selectedConversation === c.id ? 'bg-white/80 border-l-4 border-gradient-to-b from-emerald-400 via-blue-400 to-indigo-400 shadow-lg scale-[1.03]' : 'hover:bg-white/60 hover:scale-105'} duration-200`}
                  onClick={() => setSelectedConversation(c.id)}
                  title={c.email}
                >
                  <div className="relative">
                    <Image src={c.avatar} alt={c.name} width={44} height={44} className="h-11 w-11 object-cover rounded-full border-2 border-white/60 shadow-md group-hover:shadow-xl transition-all duration-200" />
                    <span className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white ${c.status === 'online' ? 'bg-emerald-400 animate-pulse' : c.status === 'away' ? 'bg-yellow-400' : 'bg-gray-300'}`}></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate">{c.name}</span>
                      {c.status === 'online' && <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse inline-block" />}
                      {c.status === 'away' && <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block" />}
                    </div>
                    <span className="block text-xs text-gray-500 truncate">{c.lastMessage}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-400">{c.time}</span>
                    {c.unread && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                  </div>
                </div>
              ))}
            </div>
            {/* Floating New Customer Button */}
            <button className="absolute bottom-8 right-8 z-10 bg-gradient-to-br from-emerald-400 via-blue-400 to-indigo-400 text-white rounded-full p-4 shadow-xl hover:scale-110 transition-all duration-200 border-4 border-white/60 backdrop-blur-xl">
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </aside>
        <div className={`flex flex-col flex-1 mx-auto w-full h-full px-2 md:px-4 py-2 md:py-6 transition-all duration-300 ${aiMinimized ? 'max-w-4xl' : 'max-w-2xl'}`}>
          <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden relative transition-all duration-300">
            {/* Watermark/pattern */}
            <div className="absolute inset-0 pointer-events-none bg-[url('/pattern.svg')] bg-repeat opacity-10 z-0" />
          {/* Header */}
            <header className="flex items-center justify-between px-8 py-5 bg-white/80 border-b border-white/30 shadow-sm z-10 sticky top-0">
            <div className="flex items-center gap-4">
                <div className="group relative">
                  <Image src="https://ui-avatars.com/api/?name=Sarah+Wilson&background=E0E7EF&color=374151&size=64" alt="Sarah Wilson" width={44} height={44} className="rounded-full border-2 border-emerald-200 shadow-sm aspect-square object-cover group-hover:shadow-emerald-200 group-hover:scale-110 transition-all duration-200" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 animate-pulse" />
                </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Sarah Wilson</h1>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse inline-block" /> Online</span>
                </div>
              </div>
              <button className="px-4 py-2 rounded-full bg-gradient-to-br from-emerald-400 via-blue-400 to-indigo-400 text-white font-semibold shadow hover:scale-105 transition flex items-center gap-2"><PlusIcon className="h-5 w-5" /> New Chat</button>
          </header>
          {/* Messages */}
            <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6 custom-scrollbar bg-transparent z-10">
              {localMessages.map((message, idx) => {
                const isUser = message.sender === 'user';
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : ''}`} style={{ maxWidth: '80%' }}>
                      <Image
                        src={isUser ? 'https://randomuser.me/api/portraits/women/32.jpg' : 'https://randomuser.me/api/portraits/men/32.jpg'}
                        alt={isUser ? 'User' : 'Agent'}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/60 shadow-md flex-shrink-0"
                      />
                      <div
                        className={`rounded-2xl px-5 py-3 shadow-lg flex flex-col transition-all duration-200 ${isUser
                          ? 'bg-white/90 text-gray-900 rounded-br-3xl items-end border border-emerald-100'
                          : 'bg-indigo-50/80 text-gray-900 rounded-bl-3xl border border-blue-100 items-start'}`}
                        style={{ minWidth: 0 }}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed mb-1 break-words">{message.content}</p>
                        <span className="block text-xs text-gray-400 mt-2 text-right">{message.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
            <form className="flex items-center gap-3 px-6 py-5 bg-white/60 border-t border-white/30 shadow-none sticky bottom-0 z-10 backdrop-blur-xl">
              <button type="button" className="p-2 rounded-full text-gray-400 hover:bg-emerald-100 transition hover:scale-110">
              <FaceSmileIcon className="h-6 w-6" />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              placeholder="Type your message..."
                className="flex-1 rounded-full px-5 py-3 border border-white/30 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow"
              onKeyUp={e => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              type="button"
              onClick={handleSendMessage}
                className="px-5 py-3 rounded-full bg-gradient-to-br from-emerald-400 via-blue-400 to-indigo-400 text-white font-semibold shadow hover:scale-110 transition flex items-center gap-2"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
              </div>
        {!aiMinimized && (
          <aside className={`hidden lg:flex flex-col w-[520px] h-full bg-gradient-to-br from-indigo-100 via-blue-200 to-emerald-100 border border-indigo-200 shadow-2xl p-4 md:p-10 animate-fade-in-up rounded-2xl relative transition-all duration-300`}>
            <button onClick={() => setAiMinimized(true)} className="absolute top-6 right-6 bg-white/80 hover:bg-white text-indigo-500 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-200 z-20">
              <ChevronRightIcon className="h-5 w-5" />
                  </button>
            <AiAssistantSidebar
              aiConversation={aiConversation}
              isAiTyping={isAiTyping}
              aiTypingText={aiTypingText}
              aiChatRef={aiChatRef}
              aiSuggestions={aiSuggestions}
              handleAiQuestionSelect={handleAiQuestionSelect}
            />
            {/* Floating help button */}
            <button className="absolute top-6 left-6 bg-gradient-to-br from-blue-400 to-emerald-400 text-white rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-200">
              <LightBulbIcon className="h-5 w-5" />
                </button>
        </aside>
        )}
        {aiMinimized && (
          <button
            onClick={() => setAiMinimized(false)}
            className="hidden lg:flex fixed bottom-8 right-8 z-50 bg-gradient-to-br from-indigo-400 via-blue-400 to-emerald-400 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-200 border-4 border-white/60 backdrop-blur-xl"
            title="Show AI Assistant"
          >
            <SparklesIcon className="h-6 w-6" />
          </button>
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e7ef;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 12s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4,0,0.2,1) infinite;
        }
      `}</style>
    </DashboardLayout>
  )
} 