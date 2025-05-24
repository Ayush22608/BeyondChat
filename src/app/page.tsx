import Link from 'next/link'
import { ChatBubbleLeftRightIcon, UserGroupIcon, ChartBarIcon, Cog6ToothIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/conversations');
  return null;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-emerald-50 relative overflow-x-hidden">
      {/* Animated SVG Background Shape */}
      <svg className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 opacity-30 blur-2xl" width="900" height="400" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="450" cy="200" rx="400" ry="120" fill="url(#paint0_linear)" />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="900" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-28 px-4 text-center relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 bg-clip-text text-transparent shine-logo drop-shadow-lg">BeyondChats</span>
          <SparklesIcon className="h-10 w-10 text-indigo-400 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow">Modern Customer Support & Chatbot Platform</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10">Manage conversations, customers, analytics, and AI-powered support in one beautiful dashboard.</p>
        <div className="flex flex-wrap gap-6 justify-center mb-2">
          <Link href="/conversations" className="px-8 py-4 rounded-full bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition text-xl">Go to Inbox</Link>
          <Link href="/customers" className="px-8 py-4 rounded-full bg-white text-indigo-700 font-bold shadow-lg hover:bg-indigo-50 border border-indigo-100 transition text-xl">Customers</Link>
          <Link href="/analytics" className="px-8 py-4 rounded-full bg-white text-indigo-700 font-bold shadow-lg hover:bg-indigo-50 border border-indigo-100 transition text-xl">Analytics</Link>
          <Link href="/settings" className="px-8 py-4 rounded-full bg-white text-indigo-700 font-bold shadow-lg hover:bg-indigo-50 border border-indigo-100 transition text-xl">Settings</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105">
          <ChatBubbleLeftRightIcon className="h-12 w-12 text-indigo-500 mb-3" />
          <h3 className="font-bold text-xl mb-2">Real-time Inbox</h3>
          <p className="text-gray-500 text-base">Manage all your customer conversations in a unified, real-time inbox with modern chat features.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105">
          <UserGroupIcon className="h-12 w-12 text-emerald-500 mb-3" />
          <h3 className="font-bold text-xl mb-2">Customer Management</h3>
          <p className="text-gray-500 text-base">View, search, and organize your customers with detailed profiles and activity history.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105">
          <ChartBarIcon className="h-12 w-12 text-blue-500 mb-3" />
          <h3 className="font-bold text-xl mb-2">Analytics & Insights</h3>
          <p className="text-gray-500 text-base">Track key metrics, satisfaction, and team performance with beautiful analytics dashboards.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105">
          <Cog6ToothIcon className="h-12 w-12 text-indigo-400 mb-3" />
          <h3 className="font-bold text-xl mb-2">Customizable Settings</h3>
          <p className="text-gray-500 text-base">Configure notifications, appearance, integrations, and more to fit your workflow.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-gray-400 text-base border-t border-gray-200">
        &copy; {new Date().getFullYear()} BeyondChats. All rights reserved.
      </footer>
    </div>
  )
} 