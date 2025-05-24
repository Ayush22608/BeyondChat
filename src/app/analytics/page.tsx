'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Conversations',
    value: '1,234',
    change: '+12.3%',
    changeType: 'positive',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Active Users',
    value: '456',
    change: '+8.2%',
    changeType: 'positive',
    icon: UserGroupIcon,
  },
  {
    name: 'Avg. Response Time',
    value: '2.5m',
    change: '-15.3%',
    changeType: 'negative',
    icon: ClockIcon,
  },
  {
    name: 'Satisfaction Rate',
    value: '94%',
    change: '+2.1%',
    changeType: 'positive',
    icon: ChartBarIcon,
  },
]

const timeRanges = [
  { name: 'Today', current: false },
  { name: 'Last 7 days', current: true },
  { name: 'Last 30 days', current: false },
  { name: 'Last 90 days', current: false },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mb-8">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-extrabold text-gray-900">Analytics</h1>
            <p className="mt-2 text-lg text-gray-700">
              Overview of your customer support metrics and performance.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <div className="flex space-x-2">
              {timeRanges.map((range) => (
                <button
                  key={range.name}
                  type="button"
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-all duration-150 ${
                    range.current
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-indigo-100 via-blue-50 to-white rounded-2xl shadow p-6 flex items-center gap-4">
            <ChatBubbleLeftRightIcon className="h-10 w-10 text-indigo-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-sm text-gray-500">Total Conversations</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-100 via-blue-50 to-white rounded-2xl shadow p-6 flex items-center gap-4">
            <UserGroupIcon className="h-10 w-10 text-emerald-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">456</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 via-indigo-50 to-white rounded-2xl shadow p-6 flex items-center gap-4">
            <ClockIcon className="h-10 w-10 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">2.5m</div>
              <div className="text-sm text-gray-500">Avg. Response Time</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-100 via-indigo-50 to-white rounded-2xl shadow p-6 flex items-center gap-4">
            <ArrowTrendingUpIcon className="h-10 w-10 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-500">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Conversation Volume Chart */}
          <div className="rounded-2xl bg-white shadow-xl p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold leading-6 text-gray-900 mb-2 flex items-center gap-2"><ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-500" /> Conversation Volume</h3>
            <div className="h-64 bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Dummy SVG Bar Chart */}
              <svg width="90%" height="80%" viewBox="0 0 300 120">
                <rect x="10" y="60" width="30" height="50" fill="#6366f1" rx="6" />
                <rect x="50" y="40" width="30" height="70" fill="#818cf8" rx="6" />
                <rect x="90" y="20" width="30" height="90" fill="#a5b4fc" rx="6" />
                <rect x="130" y="50" width="30" height="60" fill="#6366f1" rx="6" />
                <rect x="170" y="30" width="30" height="80" fill="#818cf8" rx="6" />
                <rect x="210" y="70" width="30" height="40" fill="#a5b4fc" rx="6" />
              </svg>
            </div>
          </div>

          {/* Response Time Chart */}
          <div className="rounded-2xl bg-white shadow-xl p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold leading-6 text-gray-900 mb-2 flex items-center gap-2"><ClockIcon className="h-6 w-6 text-blue-500" /> Average Response Time</h3>
            <div className="h-64 bg-gradient-to-br from-blue-50 via-indigo-50 to-white rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Dummy SVG Line Chart */}
              <svg width="90%" height="80%" viewBox="0 0 300 120">
                <polyline fill="none" stroke="#6366f1" strokeWidth="4" points="10,100 60,80 110,90 160,40 210,60 260,30" />
                <circle cx="10" cy="100" r="5" fill="#6366f1" />
                <circle cx="60" cy="80" r="5" fill="#6366f1" />
                <circle cx="110" cy="90" r="5" fill="#6366f1" />
                <circle cx="160" cy="40" r="5" fill="#6366f1" />
                <circle cx="210" cy="60" r="5" fill="#6366f1" />
                <circle cx="260" cy="30" r="5" fill="#6366f1" />
              </svg>
            </div>
          </div>

          {/* Customer Satisfaction Chart */}
          <div className="rounded-2xl bg-white shadow-xl p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold leading-6 text-gray-900 mb-2 flex items-center gap-2"><ArrowTrendingUpIcon className="h-6 w-6 text-pink-500" /> Customer Satisfaction</h3>
            <div className="h-64 bg-gradient-to-br from-pink-50 via-indigo-50 to-white rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Dummy SVG Bar Chart */}
              <svg width="90%" height="80%" viewBox="0 0 300 120">
                <rect x="10" y="80" width="30" height="30" fill="#f472b6" rx="6" />
                <rect x="50" y="60" width="30" height="50" fill="#f9a8d4" rx="6" />
                <rect x="90" y="40" width="30" height="70" fill="#fbcfe8" rx="6" />
                <rect x="130" y="70" width="30" height="40" fill="#f472b6" rx="6" />
                <rect x="170" y="50" width="30" height="60" fill="#f9a8d4" rx="6" />
                <rect x="210" y="90" width="30" height="20" fill="#fbcfe8" rx="6" />
              </svg>
            </div>
          </div>

          {/* Top Issues Chart */}
          <div className="rounded-2xl bg-white shadow-xl p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold leading-6 text-gray-900 mb-2 flex items-center gap-2"><ChartBarIcon className="h-6 w-6 text-indigo-500" /> Top Issues</h3>
            <div className="h-64 bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Dummy SVG Bar Chart */}
              <svg width="90%" height="80%" viewBox="0 0 300 120">
                <rect x="10" y="60" width="30" height="50" fill="#6366f1" rx="6" />
                <rect x="50" y="40" width="30" height="70" fill="#818cf8" rx="6" />
                <rect x="90" y="20" width="30" height="90" fill="#a5b4fc" rx="6" />
                <rect x="130" y="50" width="30" height="60" fill="#6366f1" rx="6" />
                <rect x="170" y="30" width="30" height="80" fill="#818cf8" rx="6" />
                <rect x="210" y="70" width="30" height="40" fill="#a5b4fc" rx="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 