import React from 'react';

const StatsCard = ({ title, count, icon: Icon, colorClass }) => {
  return (
    <div className="card p-6 flex items-center space-x-4">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
          {count}
        </h4>
      </div>
    </div>
  );
};

export default StatsCard;
