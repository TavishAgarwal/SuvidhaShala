import {
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Download,
  Eye
} from 'lucide-react';
import { Sidebar } from './Sidebar';

const statsCards = [
  {
    title: 'Total Worksheets',
    value: '1,234',
    icon: FileText,
    gradient: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Active Students',
    value: '856',
    icon: Users,
    gradient: 'from-pink-400 to-pink-600',
    bg: 'bg-pink-50'
  },
  {
    title: 'NCERT Chapters',
    value: '124',
    icon: BookOpen,
    gradient: 'from-cyan-400 to-cyan-600',
    bg: 'bg-cyan-50'
  },
  {
    title: 'This Month',
    value: '342',
    icon: TrendingUp,
    gradient: 'from-orange-400 to-orange-600',
    bg: 'bg-orange-50'
  },
];

const recentWorksheets = [
  { student: 'Aarav Kumar', class: 'Class 5', chapter: 'Components of Food', score: '85/100', date: '12/05/2023', status: 'Excellent', grade: 'Pass' },
  { student: 'Diya Sharma', class: 'Class 6', chapter: 'Electricity', score: '70/100', date: '12/05/2023', status: 'Average', grade: 'Pass' },
  { student: 'Vivaan Patel', class: 'Class 4', chapter: 'Plants', score: '55/100', date: '12/05/2023', status: 'Poor', grade: 'Fail' },
  { student: 'Priya Singh', class: 'Class 7', chapter: 'Motion', score: '92/100', date: '12/05/2023', status: 'Excellent', grade: 'Pass' },
];

const notices = [
  {
    title: 'New Dyslexia Templates Available',
    description: 'Updated templates for better readability',
    author: 'System Admin',
    image: '📝',
    color: 'bg-blue-100'
  },
  {
    title: 'NCERT Syllabus Update 2023',
    description: 'New chapters added for Classes 6-8',
    author: 'Content Team',
    image: '📚',
    color: 'bg-green-100'
  },
  {
    title: 'Accessibility Features Guide',
    description: 'Learn about ADHD-friendly formats',
    author: 'Support Team',
    image: '♿',
    color: 'bg-purple-100'
  },
  {
    title: 'WhatsApp Bot Improvements',
    description: 'Faster generation, Hindi support',
    author: 'Tech Team',
    image: '💬',
    color: 'bg-orange-100'
  },
];

const monthlyStats = [
  { month: '2017', value: 200 },
  { month: '2018', value: 280 },
  { month: '2019', value: 350 },
  { month: '2020', value: 580 },
  { month: '2021', value: 320 },
  { month: '2022', value: 420 },
];

export function DashboardPage() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-[#E8E8F0] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A2E]">Dashboard</h1>
              <p className="text-sm text-[#888899]">Welcome back, Teacher!</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-[#888899] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-[#E8E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B68EE]/30 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-[#F8F9FF] rounded-xl transition-colors">
                <Bell className="w-6 h-6 text-[#888899]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-[#E8E8F0]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B68EE] to-[#9D8FFF] flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JK</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1A1A2E]">Jane Khan</div>
                  <div className="text-xs text-[#888899]">Teacher</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 border border-[#E8E8F0] hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-[#888899] mb-1">{stat.title}</div>
                  <div className="text-3xl font-bold text-[#1A1A2E]">{stat.value}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Statistics Chart */}
            <div className="col-span-2 bg-white rounded-2xl p-6 border border-[#E8E8F0]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#1A1A2E]">Statistics</h3>
                <select className="px-3 py-2 border border-[#E8E8F0] rounded-lg text-sm text-[#7B68EE] font-medium focus:outline-none focus:ring-2 focus:ring-[#7B68EE]/30">
                  <option>Yearly</option>
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end justify-between h-64 gap-8">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end" style={{ height: '200px' }}>
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          stat.month === '2020'
                            ? 'bg-gradient-to-t from-[#7B68EE] to-[#9D8FFF]'
                            : 'bg-[#E8E8F0] hover:bg-[#D0D0E0]'
                        }`}
                        style={{ height: `${(stat.value / 600) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-[#888899]">{stat.month}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-[#888899] mt-2">0 - 800 worksheets generated</div>
            </div>

            {/* Course Activities / Calendar */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E8F0]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-[#1A1A2E]">{currentMonth}</h3>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-[#F8F9FF] rounded">
                    <ChevronLeft className="w-4 h-4 text-[#888899]" />
                  </button>
                  <button className="p-1 hover:bg-[#F8F9FF] rounded">
                    <ChevronRight className="w-4 h-4 text-[#888899]" />
                  </button>
                </div>
              </div>

              {/* Mini Calendar */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-xs text-[#888899] text-center font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2;
                  const isToday = day === 13;
                  const isValid = day > 0 && day <= 31;

                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                        !isValid
                          ? 'text-[#D0D0E0]'
                          : isToday
                          ? 'bg-gradient-to-br from-[#7B68EE] to-[#9D8FFF] text-white font-bold shadow-lg'
                          : 'text-[#1A1A2E] hover:bg-[#F8F9FF] cursor-pointer'
                      }`}
                    >
                      {isValid ? day : ''}
                    </div>
                  );
                })}
              </div>

              {/* Activity Summary */}
              <div className="mt-6 pt-6 border-t border-[#E8E8F0]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#1A1A2E]">This Week</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-16 relative">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#E8E8F0"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="url(#gradient)"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.75)}`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7B68EE" />
                            <stop offset="100%" stopColor="#9D8FFF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#7B68EE]">75%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7B68EE] to-[#9D8FFF]"></div>
                    <span className="text-xs text-[#888899]">Process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E8E8F0]"></div>
                    <span className="text-xs text-[#888899]">In progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Recent Worksheets Table */}
            <div className="col-span-2 bg-white rounded-2xl p-6 border border-[#E8E8F0]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#1A1A2E]">Recent Worksheets</h3>
                <button className="text-sm text-[#7B68EE] font-medium hover:underline">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8E8F0]">
                      <th className="text-left text-xs font-medium text-[#888899] pb-3">Student Name</th>
                      <th className="text-left text-xs font-medium text-[#888899] pb-3">Score</th>
                      <th className="text-left text-xs font-medium text-[#888899] pb-3">Submitted</th>
                      <th className="text-left text-xs font-medium text-[#888899] pb-3">Teacher</th>
                      <th className="text-left text-xs font-medium text-[#888899] pb-3">Grade</th>
                      <th className="text-left text-xs font-medium text-[#888899] pb-3">Pass/Fail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentWorksheets.map((worksheet, index) => (
                      <tr key={index} className="border-b border-[#E8E8F0] hover:bg-[#F8F9FF]">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B68EE] to-[#9D8FFF] flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {worksheet.student.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-[#1A1A2E]">{worksheet.student}</div>
                              <div className="text-xs text-[#888899]">{worksheet.chapter}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm text-[#1A1A2E]">{worksheet.score}</td>
                        <td className="text-sm text-[#888899]">{worksheet.date}</td>
                        <td>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            worksheet.status === 'Excellent'
                              ? 'bg-green-100 text-green-700'
                              : worksheet.status === 'Average'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {worksheet.status}
                          </span>
                        </td>
                        <td>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            worksheet.grade === 'Pass'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {worksheet.grade}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-[#F8F9FF] rounded">
                              <Eye className="w-4 h-4 text-[#888899]" />
                            </button>
                            <button className="p-1 hover:bg-[#F8F9FF] rounded">
                              <Download className="w-4 h-4 text-[#888899]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notice Board */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E8F0]">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-6">Notice Board</h3>

              <div className="space-y-4">
                {notices.map((notice, index) => (
                  <div key={index} className="flex gap-3 p-3 hover:bg-[#F8F9FF] rounded-xl transition-colors cursor-pointer">
                    <div className={`w-12 h-12 ${notice.color} rounded-xl flex items-center justify-center flex-shrink-0 text-2xl`}>
                      {notice.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#1A1A2E] mb-1 truncate">
                        {notice.title}
                      </div>
                      <div className="text-xs text-[#888899] mb-2 line-clamp-2">
                        {notice.description}
                      </div>
                      <div className="text-xs text-[#7B68EE]">By - {notice.author}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
