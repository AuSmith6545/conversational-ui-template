
// Conversational UI Customization Tool
// Scaffolded React App with GPT-powered layout control

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Sample product data with cost values
const mockData = [
  { name: 'Product A', cost: 120 },
  { name: 'Product B', cost: 45 },
  { name: 'Product C', cost: 200 },
  { name: 'Product D', cost: 75 },
];

// Utility function to sort the data by cost
const sortDataByCost = (data, direction = 'desc') => {
  return [...data].sort((a, b) => direction === 'asc' ? a.cost - b.cost : b.cost - a.cost);
};

// Sticky banner component for pinning content to the top of the viewport
function StickyBanner({ children }) {
  return (
    <div style={{ position: 'sticky', top: 0, background: '#f0f0f0', padding: '1rem', zIndex: 1000 }}>
      {children}
    </div>
  );
}

// Chart component for rendering a bar chart of product costs
function CostBreakdownChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cost" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Main application component
function App() {
  // State to hold the user's text command
  const [layoutCommand, setLayoutCommand] = useState('');
  // State to toggle chart visibility
  const [chartVisible, setChartVisible] = useState(false);
  // State to hold sorted data for the chart
  const [sortedData, setSortedData] = useState(mockData);

  // Function to handle and interpret user commands
  const handleCommand = () => {
    // Basic interpretation logic (can be replaced by GPT for advanced parsing)
    if (layoutCommand.toLowerCase().includes('show') && layoutCommand.toLowerCase().includes('cost')) {
      setChartVisible(true); // show the chart

      // Sort by ascending if the command mentions "least", otherwise descending
      if (layoutCommand.toLowerCase().includes('least')) {
        setSortedData(sortDataByCost(mockData, 'asc'));
      } else {
        setSortedData(sortDataByCost(mockData, 'desc'));
      }
    }
  };

  return (
    <div>
      <h1 style={{ padding: '1rem' }}>Conversational UI Customization</h1>

      {/* Input field and button for entering layout commands */}
      <div style={{ padding: '1rem' }}>
        <input
          type="text"
          value={layoutCommand}
          onChange={(e) => setLayoutCommand(e.target.value)}
          placeholder="Type a command like: Show cost breakdown as a chart"
          style={{ width: '60%', padding: '0.5rem' }}
        />
        <button onClick={handleCommand} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>Run</button>
      </div>

      {/* Conditional rendering of sticky chart banner based on user command */}
      {chartVisible && (
        <StickyBanner>
          <h2>Cost Breakdown</h2>
          <CostBreakdownChart data={sortedData} />
        </StickyBanner>
      )}

      {/* Placeholder content below the banner */}
      <div style={{ padding: '2rem' }}>
        <h3>Page Content Here</h3>
        <p>This is the rest of your UI. Add more components or data views below.</p>
      </div>
    </div>
  );
}

export default App;
