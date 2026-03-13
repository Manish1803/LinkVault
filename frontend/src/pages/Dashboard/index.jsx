import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../services/appService";
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchDashboardData();
        setData(response);
        console.log(response);
      } catch (error) {
        toast.error(error.message || "Please try again later");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  if (!data || data.totalViews === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.total}>
          Total Clicks <span className={styles.count}>0</span>
        </h2>
        <div className={styles.card}>
          <p className={styles.noData}>
            No activity recorded yet. Start engaging to see data here!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.total}>
        Total Clicks <span className={styles.count}>{data.totalViews}</span>
      </h2>
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.title}>Date-wise Clicks</p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={data.dateWise}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-text-muted)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="var(--color-text-muted)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(18, 18, 28, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
                  }}
                  itemStyle={{ color: "var(--color-primary)" }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Clicks"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>Click Device</p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={data.deviceWise}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="device" 
                  stroke="var(--color-text-muted)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="var(--color-text-muted)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  contentStyle={{
                    backgroundColor: "rgba(18, 18, 28, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
                  }}
                  itemStyle={{ color: "var(--color-primary)" }}
                />
                <Bar 
                  dataKey="count" 
                  name="Clicks" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
