import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsDashboard = () => {
  const data = {
    "organization": "companyA",
    "eod_reports": [
      {
        "date": "2025-03-19",
        "total_logins": 11,
        "total_chat_sessions": 56,
        "total_messages": 39,
        "total_agents_used": 3,
        "agent_usage": {
          "onboarding": 8,
          "recruitment": 20,
          "content_generation": 11
        }
      },
      {
        "date": "2025-03-18",
        "total_logins": 42,
        "total_chat_sessions": 5,
        "total_messages": 33,
        "total_agents_used": 5,
        "agent_usage": {
          "crm": 1,
          "seo": 2,
          "social": 2,
          "onboarding": 25,
          "recruitment": 3
        }
      },
      {
        "date": "2025-03-17",
        "total_logins": 19,
        "total_chat_sessions": 17,
        "total_messages": 21,
        "total_agents_used": 9,
        "agent_usage": {
          "crm": 5,
          "seo": 1,
          "sales": 1,
          "social": 1,
          "onboarding": 3,
          "recruitment": 1,
          "lead_generation": 1,
          "market_research": 4,
          "content_generation": 2
        }
      },
      {
        "date": "2025-03-16",
        "total_logins": 2,
        "total_chat_sessions": 0,
        "total_messages": 2,
        "total_agents_used": 0,
        "agent_usage": {}
      }
    ]
  };

  // Reverse the array to show chronological order
  const sortedData = [...data.eod_reports].reverse();

  // For the agent usage pie chart
  const [selectedDate, setSelectedDate] = useState("2025-03-19");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Prepare data for charts
  const prepareChartData = () => {
    return sortedData.map(report => ({
      ...report,
      date: formatDate(report.date),
      rawDate: report.date
    }));
  };

  const chartData = prepareChartData();

  // Prepare data for agent usage pie chart
  const prepareAgentUsageData = () => {
    const report = data.eod_reports.find(r => r.date === selectedDate);
    
    if (!report) return [];
    
    return Object.entries(report.agent_usage).map(([name, value]) => ({
      name,
      value
    }));
  };

  const agentUsageData = prepareAgentUsageData();

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c'];

  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">CompanyA Analytics Dashboard</h1>
        <select 
          className="px-3 py-2 rounded border border-gray-300"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {data.eod_reports.map(report => (
            <option key={report.date} value={report.date}>
              {formatDate(report.date)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {data.eod_reports.find(r => r.date === selectedDate) && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.eod_reports.find(r => r.date === selectedDate).total_logins}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.eod_reports.find(r => r.date === selectedDate).total_chat_sessions}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.eod_reports.find(r => r.date === selectedDate).total_messages}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Agents Used</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.eod_reports.find(r => r.date === selectedDate).total_agents_used}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Tabs defaultValue="overall">
        <TabsList>
          <TabsTrigger value="overall">Overall Metrics</TabsTrigger>
          <TabsTrigger value="agent-usage">Agent Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_logins" stroke="#8884d8" name="Logins" />
                    <Line type="monotone" dataKey="total_chat_sessions" stroke="#82ca9d" name="Chat Sessions" />
                    <Line type="monotone" dataKey="total_messages" stroke="#ffc658" name="Messages" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Agents Used by Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_agents_used" fill="#8884d8" name="Agents Used" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agent-usage">
          <Card>
            <CardHeader>
              <CardTitle>Agent Usage for {formatDate(selectedDate)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center">
                {agentUsageData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={agentUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={140}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {agentUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p>No agent usage data available for this date</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;