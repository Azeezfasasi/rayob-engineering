"use client"
import React, { useEffect, useState } from 'react'

function getGreeting(date) {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}


export default function DashboardWelcome({ name = 'Admin' }) {
  const [now, setNow] = useState(null);
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    function updateTime() {
      const current = new Date();
      setNow(current);
      setGreeting(getGreeting(current));
      setDateStr(new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(current));
      setTimeStr(new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(current));
    }
    updateTime();
    const t = setInterval(updateTime, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-sm p-5 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-linear-to-br from-orange-400 to-red-500 text-white text-xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
              {greeting}, <span className="text-indigo-600">{name}</span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">{dateStr} • {timeStr}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v8l3-3" />
            </svg>
            Quick overview
          </button>

          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            View reports
          </button>
        </div>
      </div>
    </section>
  );
}
