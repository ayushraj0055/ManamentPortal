import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';
import StatsCard from '../components/StatsCard';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { CheckSquare, Clock, LayoutList, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Filter & Search states
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStats = async () => {
    try {
      const res = await api.get('/tasks/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 9, // 3x3 grid
      };
      if (filter !== 'All') params.status = filter;
      if (search) params.search = search;

      const res = await api.get('/tasks', { params });
      setTasks(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error('Failed to load tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filter, search]);

  useEffect(() => {
    fetchStats();
  }, []); // Refetch stats only occasionally or when a task is modified

  useEffect(() => {
    // Reset to page 1 when filters change
    setPage(1);
  }, [filter, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTasks();
    }, 300); // Debounce search

    return () => clearTimeout(delayDebounceFn);
  }, [fetchTasks]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      toast.success('Task status updated');
      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        toast.success('Task deleted');
        fetchTasks();
        fetchStats();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Here's what's happening with your tasks today.
        </p>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Tasks" count={stats.total} icon={LayoutList} colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
          <StatsCard title="Pending" count={stats.pending} icon={ListTodo} colorClass="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" />
          <StatsCard title="In Progress" count={stats.inProgress} icon={Clock} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
          <StatsCard title="Completed" count={stats.completed} icon={CheckSquare} colorClass="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" />
        </div>
      )}

      {/* Filter Section */}
      <TaskFilter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />

      {/* Tasks Grid */}
      <div>
        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <EmptyState message={search || filter !== 'All' ? 'No tasks match your filters' : 'No tasks found'} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
                <div className="flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  Page {page} of {totalPages}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
