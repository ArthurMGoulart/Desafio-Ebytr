import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import taskValidate from './validate/taskValidate';
import api from '../../services/api';

function TaskForm() {
  const [invalidTask, setInvalidTask] = useState();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    resolver: yupResolver(taskValidate),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    console.log(id);
    console.log(token)
    const newTask = {
      user_id: id,
      ...data
    }
    console.log(newTask)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    api.post('/tasks', newTask, {
      headers: headers
    })
      .then((response) => {
        console.log(response)
        navigate('/user/tasks');
      }).catch(({ response }) => setInvalidTask(response.data));
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="common_task__input-description"
            placeholder="Seu nome"
            id="description"
            name="description"
            type="text"
            { ...register('description') }
          />
          <p>
            { errors.description?.message }
          </p>
        </label>
      </div>
      <div>
        <label htmlFor="status">
        status
          <input
            data-testid="common_task__input-status"
            placeholder="pendente"
            id="status"
            name="status"
            type="text"
            { ...register('status') }
          />
          <p>
            { errors.status?.message }
          </p>
        </label>
      </div>
      <button
        data-testid="common_task__button-task"
        type="submit"
        disabled={ !isDirty || !isValid }
      >
        Criar Tarefa
      </button>
      <p data-testid="common_task__element-invalid_task">
        { invalidTask?.message }
      </p>
    </form>
  );
}

export default TaskForm;
