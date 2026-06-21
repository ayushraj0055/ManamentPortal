import React from 'react';
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ message = "No tasks found", showAction = true }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-6">
        <ClipboardList size={48} className="text-primary-500 dark:text-primary-400 opacity-80" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {message}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        Get started by creating a new task to keep track of your work and boost productivity.
      </p>
      
      {showAction && (
        <Link to="/add-task" className="btn-primary flex items-center gap-2">
          <span>Create Your First Task</span>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
