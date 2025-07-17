import React, { useState } from 'react';

import Container from '@/components/shared/container';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { IActivityLog } from '@/types';

const ActivityLogs: React.FC = ({}) => {
  const [logs, setLogs] = useState(content?.activityLogs);

  const [newActivity, setNewActivity] = useState('');
  const addNewActivity = () => {
    if (newActivity?.trim()) {
      const newLog: IActivityLog = {
        id: Date.now().toString(),
        action: newActivity,
        patientName: 'Patient Name',
        timestamp: new Date()
          .toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
          .replace(',', ' at'),
        performedBy: 'Current User',
        isChecked: true,
      };
      setLogs([newLog, ...logs]);
      setNewActivity('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addNewActivity();
    }
  };

  return (
    <Container hasBorders>
      <div className="p-6 mx-auto">
        <div className="flex flex-col gap-4">
          <Typography size={'lg'} as={'p'} className="font-bold text-black">
            Activity Logs
          </Typography>
          <hr className="text-light-gray" />
          <div className="flex flex-col gap-2">
            <Typography size={'sm'} as={'p'} className="font-semibold text-dark-gray">
              Todays Activity
            </Typography>
            <div className="space-y-4 max-h-106 overflow-y-auto custom-scrollbar">
              {logs.map((log, index) => (
                <div key={log.id} className="flex items-start space-x-3 relative">
                  {/* Vertical line - show for all items except the last one */}
                  {index < logs.length - 1 && (
                    <div className="absolute left-1.75 top-5 w-0.5 h-28 bg-light-gray z-0"></div>
                  )}

                  <div className="flex-shrink-0 mt-1 pr-3 relative z-1">
                    <input
                      type="checkbox"
                      checked={log.isChecked}
                      readOnly
                      className={`w-4 h-4 !rounded-[16px] ${log.isChecked ? 'accent-primary-dark' : 'accent-gray'}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 pl-3">
                    <div className="flex gap-1 flex-wrap">
                      <Typography size={'sm'} as={'p'} className="text-black font-normal">
                        {log.action}
                      </Typography>
                      <Typography size={'sm'} as={'p'} className="text-primary-light cursor-pointer">
                        {log.patientName}
                      </Typography>
                    </div>
                    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between mt-1">
                      <Typography size={'sm'} as={'p'} className="text-dark-gray font-normal">
                        {log.timestamp}
                      </Typography>
                      <Typography size={'sm'} as={'p'} className="text-dark-gray font-normal">
                        By: {log.performedBy}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-1">
          <div className="relative">
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type here..."
              className="w-full pr-16 px-3 py-[11px] border border-light-gray bg-background-gray rounded-md text-sm placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addNewActivity}
              className="absolute w-20 right-1 top-1 bottom-1 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ActivityLogs;
