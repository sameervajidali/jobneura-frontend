// // src/pages/admin/ReportsPage.jsx

// import React, { useState } from 'react';
// import { Tab } from '@headlessui/react';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from 'recharts';

// const dummyDAU = [
//   { date: '2025-05-01', count: 12 },
//   { date: '2025-05-02', count: 20 },
//   { date: '2025-05-03', count: 15 },
// ];

// const dummyCategories = [
//   { name: 'Programming', value: 40 },
//   { name: 'Algorithms', value: 30 },
//   { name: 'Data Structures', value: 30 },
// ];

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

// export default function ReportsPage() {
//   const tabs = ['Usage', 'Engagement', 'Exports', 'Alerts'];

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Reports</h1>

//       <Tab.Group>
//         <Tab.List className="flex space-x-2 border-b">
//           {tabs.map(tab => (
//             <Tab
//               key={tab}
//               className={({ selected }) =>
//                 `px-4 py-2 rounded-t ${
//                   selected
//                     ? 'bg-indigo-600 text-white'
//                     : 'bg-gray-100 text-gray-700'
//                 }`
//               }
//             >
//               {tab}
//             </Tab>
//           ))}
//         </Tab.List>

//         <Tab.Panels className="bg-white p-6 rounded-b-lg shadow">
//           {/* Usage Reports */}
//           <Tab.Panel>
//             <h2 className="text-xl font-semibold mb-4">Daily Active Users</h2>
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={dummyDAU}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line dataKey="count" stroke="#8884d8" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </Tab.Panel>

//           {/* Engagement Reports */}
//           <Tab.Panel>
//             <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
//             <ResponsiveContainer width="100%" height={200}>
//               <PieChart>
//                 <Pie
//                   data={dummyCategories}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={50}
//                   outerRadius={80}
//                   label
//                 >
//                   {dummyCategories.map((_, idx) => (
//                     <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Legend verticalAlign="bottom" height={36} />
//               </PieChart>
//             </ResponsiveContainer>
//           </Tab.Panel>

//           {/* Exporting */}
//           <Tab.Panel>
//             <h2 className="text-xl font-semibold mb-4">Data Exports</h2>
//             <button className="mr-2 px-4 py-2 bg-blue-600 text-white rounded">
//               Export CSV
//             </button>
//             <button className="px-4 py-2 bg-green-600 text-white rounded">
//               Export PDF
//             </button>
//           </Tab.Panel>

//           {/* Alerts & Trends */}
//           <Tab.Panel>
//             <h2 className="text-xl font-semibold mb-4">Alerts & Trends</h2>
//             <p>Configure thresholds:</p>
//             <ul className="list-disc ml-6">
//               <li>Sudden drop in quiz activity</li>
//               <li>Spike in failed submissions</li>
//               <li>Ticket volume thresholds</li>
//             </ul>
//           </Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  downloadAllQuizzes,
  downloadAllCategories,
  downloadAllTopics,
} from '../../services/quizService';

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

function triggerDownload(blob, filename) {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function AdminReportsPage() {
  const [categories] = useState(['Usage', 'Engagement', 'Exports', 'Alerts']);

  const handleDownload = async (type) => {
    try {
      let blob;
      switch (type) {
        case 'quizzes':
          blob = await downloadAllQuizzes();
          triggerDownload(blob.data, 'quizzes.csv');
          break;
        case 'categories':
          blob = await downloadAllCategories();
          triggerDownload(blob.data, 'categories.csv');
          break;
        case 'topics':
          blob = await downloadAllTopics();
          triggerDownload(blob.data, 'topics.csv');
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Please try again later.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-2 border-b">
          {categories.map((cat) => (
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
            <div className="space-y-2">
              <button
                onClick={() => handleDownload('quizzes')}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Download All Quizzes
              </button>
              <button
                onClick={() => handleDownload('categories')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Download All Categories
              </button>
              <button
                onClick={() => handleDownload('topics')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Download All Topics
              </button>
            </div>
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
