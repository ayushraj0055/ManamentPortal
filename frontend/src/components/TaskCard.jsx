import React from 'react';
import { CheckCircle, Clock, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card group hover:shadow-md transition-all duration-300 flex flex-col h-full border-t-4 border-t-primary-500">
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              to={`/edit-task/${task._id}`}
              className="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Edit Task"
            >
              <Edit size={16} />
            </Link>
            <button
              onClick={() => onDelete(task._id)}
              className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {task.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
          {task.description}
        </p>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <Clock size={14} className="mr-1" />
          <span>{formatDate(task.createdAt)}</span>
        </div>
      </div>
      
      {task.status !== 'Completed' && (
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 rounded-b-xl">
          <button
            onClick={() => onStatusChange(task._id, 'Completed')}
            className="w-full flex items-center justify-center gap-2 py-1.5 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          >
            <CheckCircle size={16} />
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
