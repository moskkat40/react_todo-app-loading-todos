/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as servisesTodos from './api/todos';
import { Todo } from './types/Todo';
import { AddTodo } from './components/AddTodo/AddTodo';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { FooterFiltering } from './components/FooterFiltering/FooterFiltering';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('All');

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    servisesTodos
      .getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      })
      .finally(() =>
        setTimeout(() => {
          setErrorMessage('');
        }, 3000),
      );
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    if (filter === 'Active') {
      return todos.filter(todo => !todo.completed);
    } else if (filter === 'Completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddTodo />

        <TodoList filteredTodos={filteredTodos} />
        {todos.length > 0 && (
          <FooterFiltering
            filter={filter}
            setFilter={setFilter}
            todos={todos}
          />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
