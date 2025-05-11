import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

// placeholder data
const dummyDAU = [
  { date: '2025-05-01', count: 12 },
  { date: '2025-05-02', count: 20 },
  { date: '2025-05-03', count: 15 },
];
const dummyCategories = [
  { name: 'Programming', value: 40 },
  { name: 'Algorithms', value: 30 },
  { name: 'Data Structures', value: 30 },
];
const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function AdminReportsPage() {
  let [categories] = useState(['Usage', 'Engagement', 'Exports', 'Alerts']);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-2 border-b">
          {categories.map(cat => (
            <Tab
              key={cat}
              className={({ selected }) =>
                `px-4 py-2 rounded-t ${
                  selected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              {cat}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="bg-white p-6 rounded-b-lg shadow">
          {/* Usage Reports */}
          <Tab.Panel>
            <h2 className="text-xl font-semibold mb-4">Daily Active Users</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dummyDAU}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Tab.Panel>

          {/* Engagement Reports */}
          <Tab.Panel>
            <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dummyCategories} dataKey="value" nameKey="name" outerRadius={80} label>
                  {dummyCategories.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Tab.Panel>

          {/* Exports */}
          <Tab.Panel>
            <h2 className="text-xl font-semibold mb-4">Data Exports</h2>
            <p>CSV / PDF export buttons will go here.</p>
          </Tab.Panel>

          {/* Alerts & Trends */}
          <Tab.Panel>
            <h2 className="text-xl font-semibold mb-4">Alerts & Trends</h2>
            <p>Configure thresholds and receive notifications.</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
