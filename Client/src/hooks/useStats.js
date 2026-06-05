import { useState, useEffect } from "react";
import { getStats } from "../api/stats.api.js";

export const useStats = () => {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getStats();
      setStats(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  return { stats, loading, error, refetchStats: fetchStats };
};