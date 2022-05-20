import React from 'react';
import TaskCard from '../components/task/TaskCard';
import useRequestTasksUser from '../components/hooks/tasks/useRequestTasksUser';

function SellerOrders() {
  const [tasks] = useRequestTasksUser();

  return (
    <div>
      <div className="tasks">
        { tasks.map((task, index) => (
          <TaskCard sale={ task } index={ index } key={ index } />
        ))}
      </div>
    </div>
  );
}

export default SellerOrders;