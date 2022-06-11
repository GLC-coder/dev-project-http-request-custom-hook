import React, { useEffect, useState} from 'react';
import useHttp from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  
  const [tasks, setTasks] = useState([]);
 // const requestConfig = {url:'https://shopping-cart-85e6d-default-rtdb.firebaseio.com/tasks.json'};
  
 const {isLoading, error, sendHttpRequest: fetchTasks} = useHttp( )

  useEffect(() => {
    const getData =(data) => {
      const loadedTasks = []
      for( const taskKey in data) {
        loadedTasks.push({id: taskKey, text: data[taskKey].text})
      }
      setTasks(loadedTasks);
    };
    
    fetchTasks({url:'https://shopping-cart-85e6d-default-rtdb.firebaseio.com/tasks.json'},getData);
console.log("updated!")
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
