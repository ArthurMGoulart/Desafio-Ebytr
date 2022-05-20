import { useEffect, useState } from 'react';
import api from '../../../services/api';

function useRequestSalesSeller() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.get('/tasks', { headers: { Authorization: token } })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return [tasks];
}

export default useRequestSalesSeller;
