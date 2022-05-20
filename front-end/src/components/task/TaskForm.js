import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import taskValidate from './validate/taskValidate';
import api from '../../services/api';

function TaskForm() {
  const [invalidTask, setInvalidTask] = useState();
  const { task, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    resolver: yupResolver(taskValidate),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { user_id } = JSON.parse(localStorage.getItem('user'));
    const newTask = {
      user_id,
      ...data
    }
    api.post('/tasks', newTask)
    .then(() => {
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
            { ...task('description') }
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
            { ...task('status') }
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
