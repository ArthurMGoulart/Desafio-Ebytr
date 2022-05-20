import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/user/create/task">
        <button
          type="button"
        >
          Criar Tarefa
        </button>
      </Link>
    </div>
  );
}

export default SellerOrders;