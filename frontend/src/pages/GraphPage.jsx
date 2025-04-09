import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Info,
  ChevronDown,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Users,
  Calendar,
  Loader,
} from "lucide-react";
import { useGraphStore } from "../store/useGraphStore";

const GraphPage = () => {
  const { GraphData, GetGraphData, GraphDataLoading } = useGraphStore();

  // console.log(GraphData, "insidegraphdata");
  useEffect(() => {
    GetGraphData();
  }, []);

  // Check if data is available
  const hasData = GraphData && GraphData.length > 0;

  // Set initial selected date (if data is available)
  const initialDate = hasData ? GraphData[0].date : "";
  // console.log(initialDate, "initialdate");
  const [selectedDate, setSelectedDate] = useState("");
  // console.log(selectedDate, "selctedDtaa1");
  useEffect(() => {
    if (hasData) {
      setSelectedDate(GraphData[0].date);
    }
  }, [GraphData]); // Runs whenever GraphData changes
  // console.log(selectedDate, "selctedDtaa2");

  // Set active tab
  const [activeTab, setActiveTab] = useState("overall");

  // Set period filter
  const [activePeriod, setActivePeriod] = useState("daily");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get the start date for a specific period
  const getStartDateForPeriod = (period, endDate) => {
    if (!endDate) return null;

    const end = new Date(endDate);
    let start = new Date(end);

    switch (period) {
      case "daily":
        // Same day
        return end;
      case "weekly":
        // 7 days back
        start.setDate(end.getDate() - 6);
        return start;
      case "monthly":
        // 30 days back
        start.setDate(end.getDate() - 29);
        return start;
      case "all":
      default:
        // All dates (return null to include all)
        return null;
    }
  };

  // Prepare data for charts based on the selected period
  const prepareChartData = () => {
    if (!hasData) return [];

    let filteredData = [...GraphData];

    // If not viewing "all" data, filter based on the period
    if (activePeriod !== "all") {
      const startDate = getStartDateForPeriod(activePeriod, selectedDate);
      if (startDate) {
        const startDateStr = startDate.toISOString().split("T")[0];
        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.date);
          const itemDateStr = itemDate.toISOString().split("T")[0];
          return itemDateStr >= startDateStr && itemDateStr <= selectedDate;
        });
      }
    }

    return filteredData.reverse().map((report) => ({
      ...report,
      date: formatDate(report.date),
      rawDate: report.date,
    }));
  };

  const chartData = prepareChartData();

  // Aggregate data based on selected period
  const aggregateDataByPeriod = () => {
    if (activePeriod === "daily" || chartData.length === 0) {
      return chartData; // No aggregation needed for daily view
    }

    // For weekly, we'll aggregate by week
    if (activePeriod === "weekly") {
      const weeklyData = [];
      // Group by week and sum metrics
      const weeks = {};

      chartData.forEach((item) => {
        const date = new Date(item.rawDate);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
        const weekKey = weekStart.toISOString().split("T")[0];

        if (!weeks[weekKey]) {
          weeks[weekKey] = {
            date: `Week of ${formatDate(weekStart.toISOString())}`,
            rawDate: weekStart.toISOString(),
            total_logins: 0,
            total_chat_sessions: 0,
            total_messages: 0,
            total_agents_used: 0,
            agent_usage: {},
          };
        }

        // Sum metrics
        weeks[weekKey].total_logins += item.total_logins;
        weeks[weekKey].total_chat_sessions += item.total_chat_sessions;
        weeks[weekKey].total_messages += item.total_messages;
        weeks[weekKey].total_agents_used = Math.max(
          weeks[weekKey].total_agents_used,
          item.total_agents_used
        );

        // Aggregate agent usage
        Object.entries(item.agent_usage || {}).forEach(([agent, usage]) => {
          weeks[weekKey].agent_usage[agent] =
            (weeks[weekKey].agent_usage[agent] || 0) + usage;
        });
      });

      // Convert to array
      Object.values(weeks).forEach((week) => {
        weeklyData.push(week);
      });

      return weeklyData.sort(
        (a, b) => new Date(a.rawDate) - new Date(b.rawDate)
      );
    }

    // For monthly, we'll aggregate by month
    if (activePeriod === "monthly") {
      const monthlyData = [];
      // Group by month and sum metrics
      const months = {};

      chartData.forEach((item) => {
        const date = new Date(item.rawDate);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthKey = monthStart.toISOString().split("T")[0];

        if (!months[monthKey]) {
          months[monthKey] = {
            date: monthStart.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }),
            rawDate: monthStart.toISOString(),
            total_logins: 0,
            total_chat_sessions: 0,
            total_messages: 0,
            total_agents_used: 0,
            agent_usage: {},
          };
        }

        // Sum metrics
        months[monthKey].total_logins += item.total_logins;
        months[monthKey].total_chat_sessions += item.total_chat_sessions;
        months[monthKey].total_messages += item.total_messages;
        months[monthKey].total_agents_used = Math.max(
          months[monthKey].total_agents_used,
          item.total_agents_used
        );

        // Aggregate agent usage
        Object.entries(item.agent_usage || {}).forEach(([agent, usage]) => {
          months[monthKey].agent_usage[agent] =
            (months[monthKey].agent_usage[agent] || 0) + usage;
        });
      });

      // Convert to array
      Object.values(months).forEach((month) => {
        monthlyData.push(month);
      });

      return monthlyData.sort(
        (a, b) => new Date(a.rawDate) - new Date(b.rawDate)
      );
    }

    return chartData; // Default fallback
  };

  const aggregatedChartData = aggregateDataByPeriod();

  // Prepare data for agent usage pie chart
  const prepareAgentUsageData = () => {
    if (!hasData) return [];

    // For daily view, use the selected date
    if (activePeriod === "daily") {
      const report = GraphData.find((r) => r.date === selectedDate);
      if (!report) return [];

      return Object.entries(report.agent_usage).map(([name, value]) => ({
        name,
        value,
      }));
    }

    // For other periods, aggregate agent usage from the filtered data
    const aggregatedAgentUsage = {};

    chartData.forEach((item) => {
      Object.entries(item.agent_usage || {}).forEach(([agent, usage]) => {
        aggregatedAgentUsage[agent] =
          (aggregatedAgentUsage[agent] || 0) + usage;
      });
    });

    return Object.entries(aggregatedAgentUsage).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const agentUsageData = prepareAgentUsageData();

  // Colors for the pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
  ];

  // Function to get summary data for the selected period
  const getSummaryDataForPeriod = () => {
    if (!hasData) return null;

    // For daily view, just return the selected date's data
    if (activePeriod === "daily") {
      return GraphData.find((r) => r.date === selectedDate);
    }

    // For other periods, calculate summary metrics from the filtered data
    let totalLogins = 0;
    let totalChatSessions = 0;
    let totalMessages = 0;
    let maxAgentsUsed = 0;

    chartData.forEach((item) => {
      totalLogins += item.total_logins;
      totalChatSessions += item.total_chat_sessions;
      totalMessages += item.total_messages;
      maxAgentsUsed = Math.max(maxAgentsUsed, item.total_agents_used);
    });

    return {
      total_logins: totalLogins,
      total_chat_sessions: totalChatSessions,
      total_messages: totalMessages,
      total_agents_used: maxAgentsUsed,
    };
  };

  const summaryData = getSummaryDataForPeriod();

  // Get period title for display
  const getPeriodTitle = () => {
    switch (activePeriod) {
      case "daily":
        return `for ${formatDate(selectedDate)}`;
      case "weekly":
        const endDate = new Date(selectedDate);
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 6);
        return `for Week of ${formatDate(
          startDate.toISOString()
        )} - ${formatDate(endDate.toISOString())}`;
      case "monthly":
        const date = new Date(selectedDate);
        return `for ${date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}`;
      case "all":
        return "for All Time";
      default:
        return "";
    }
  };

  // If data is loading, show a full-page loader
  if (GraphDataLoading) {
    return (
      <div className="fixed inset-0 bg-base-300 bg-opacity-70 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-base-100 shadow-xl">
          <Loader className="w-12 h-12 animate-spin text-primary" />
          <h2 className="text-xl font-bold">Loading Analytics Data...</h2>
        </div>
      </div>
    );
  }

  // If no data is available
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <Info className="w-6 h-6" />
              No Data Available
            </h2>
            <p>There is no analytics data available to display.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 pt-20 bg-base-200 min-h-screen">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              {formatDate(selectedDate)}
              <ChevronDown className="ml-2 w-4 h-4" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto"
            >
              {GraphData.map((report) => (
                <li key={report.date}>
                  <a onClick={() => setSelectedDate(report.date)}>
                    {formatDate(report.date)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="join">
            <button
              className={`btn join-item ${
                activePeriod === "daily" ? "btn-active" : ""
              }`}
              onClick={() => setActivePeriod("daily")}
            >
              Daily
            </button>
            <button
              className={`btn join-item ${
                activePeriod === "weekly" ? "btn-active" : ""
              }`}
              onClick={() => setActivePeriod("weekly")}
            >
              Weekly
            </button>
            <button
              className={`btn join-item ${
                activePeriod === "monthly" ? "btn-active" : ""
              }`}
              onClick={() => setActivePeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={`btn join-item ${
                activePeriod === "all" ? "btn-active" : ""
              }`}
              onClick={() => setActivePeriod("all")}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData && (
          <>
            <div className="stats shadow bg-primary text-primary-content">
              <div className="stat">
                <div className="stat-figure text-primary-content">
                  <Users className="w-8 h-8" />
                </div>
                <div className="stat-title text-black">Total Logins</div>
                <div className="stat-value">{summaryData.total_logins}</div>
                <div className="stat-desc text-black">
                  {activePeriod !== "daily" ? getPeriodTitle() : ""}
                </div>
              </div>
            </div>

            <div className="stats shadow bg-secondary text-secondary-content">
              <div className="stat">
                <div className="stat-figure text-secondary-content">
                  <LineChartIcon className="w-8 h-8" />
                </div>
                <div className="stat-title text-black">Chat Sessions</div>
                <div className="stat-value">
                  {summaryData.total_chat_sessions}
                </div>
                <div className="stat-desc text-black">
                  {activePeriod !== "daily" ? getPeriodTitle() : ""}
                </div>
              </div>
            </div>

            <div className="stats shadow bg-accent text-accent-content">
              <div className="stat">
                <div className="stat-figure text-accent-content">
                  <BarChart2 className="w-8 h-8" />
                </div>
                <div className="stat-title text-black">Messages</div>
                <div className="stat-value">{summaryData.total_messages}</div>
                <div className="stat-desc text-black">
                  {activePeriod !== "daily" ? getPeriodTitle() : ""}
                </div>
              </div>
            </div>

            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <PieChartIcon className="w-8 h-8" />
                </div>
                <div className="stat-title text-black">Agents Used</div>
                <div className="stat-value">
                  {summaryData.total_agents_used}
                </div>
                <div className="stat-desc text-black">
                  {activePeriod !== "daily" ? getPeriodTitle() : ""}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="tabs tabs-boxed mb-2">
        <a
          className={`tab ${activeTab === "overall" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("overall")}
        >
          <LineChartIcon className="w-4 h-4 mr-2" />
          Overall Metrics
        </a>
        <a
          className={`tab ${activeTab === "agent-usage" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("agent-usage")}
        >
          <PieChartIcon className="w-4 h-4 mr-2" />
          Agent Usage
        </a>
      </div>

      {activeTab === "overall" && (
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <LineChartIcon className="w-6 h-6 mr-2" />
                Activity {getPeriodTitle()}
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={aggregatedChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total_logins"
                      stroke="#8884d8"
                      name="Logins"
                    />
                    <Line
                      type="monotone"
                      dataKey="total_chat_sessions"
                      stroke="#82ca9d"
                      name="Chat Sessions"
                    />
                    <Line
                      type="monotone"
                      dataKey="total_messages"
                      stroke="#ffc658"
                      name="Messages"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <BarChart2 className="w-6 h-6 mr-2" />
                Agents Used {getPeriodTitle()}
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={aggregatedChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="total_agents_used"
                      fill="#8884d8"
                      name="Agents Used"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "agent-usage" && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <PieChartIcon className="w-6 h-6 mr-2" />
              Agent Usage {getPeriodTitle()}
            </h2>
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
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {agentUsageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="alert alert-info">
                  <Info className="w-6 h-6" />
                  <span>No agent usage data available for this period</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphPage;
