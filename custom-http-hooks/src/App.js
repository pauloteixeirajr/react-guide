import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback(tasks => {
    const loadedTasks = [];

    for (const taskKey in tasks) {
      loadedTasks.push({ id: taskKey, text: tasks[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest } = useHttp(transformTasks);

  useEffect(() => {
    const url =
      'https://udemy-courses-4072a-default-rtdb.firebaseio.com/tasks.json';
    sendRequest({ url });
  }, [sendRequest]);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
