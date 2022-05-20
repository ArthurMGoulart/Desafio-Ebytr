import React from 'react';
import TaskCard from '../components/task/TaskCard';
import useRequestSalesSeller from '../components/hooks/sales/useRequestSalesSeller';

function SellerOrders() {
  const [tasks] = useRequestSalesSeller();

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