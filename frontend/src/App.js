import React, { useState, useEffect } from 'react';
import './App.css'
import TaskCard from './Component/TaskCard';
import AddTaskForm from './Component/AddTaskForm';


function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  // const [tasks, setTasks] = useState(sampleData);

  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    // Fetch tasks from the server and update the tasks state
    async function fetchTasks() {
      try {
        const response = await fetch('https://kanban-2uhq.onrender.com/Kanban/Task'); // Replace with your API endpoint
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      // Make a POST request to your backend to add the task
      const response = await fetch('https://kanban-2uhq.onrender.com/Kanban/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, status: 'todo' }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      // Parse the response and add the new task to the appropriate column
      const data = await response.json();
      setTasks((prevState) => ({
        ...prevState,
        todo: [...prevState["todo"], data],
      }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      // Make a PUT request to your backend to update the task
      const response = await fetch(`https://kanban-2uhq.onrender.com/Kanban/update/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }


      const data = await response.json();
      setTasks((prevTasks) => {
        const updatedState = { ...prevTasks }
        const taskIndex = updatedState[data.status].findIndex(
          (task) => task._id === data._id
        );

        if (taskIndex !== -1) {
          updatedState[data.status].splice(taskIndex, 1, data);
        }
        return updatedState;
      })


    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Make a DELETE request to your backend to delete the task
      const response = await fetch(`https://kanban-2uhq.onrender.com/Kanban/delete/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Remove the task from the state
      const deletedoc = await response.json()
      setTasks((prevState) => {
        const updatedState = { ...prevState };


        const taskIndex = updatedState[deletedoc.status].findIndex(
          (task) => task._id === taskId
        );
        if (taskIndex !== -1) {
          updatedState[deletedoc.status].splice(taskIndex, 1);
        }

        return updatedState;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragStart = (e, taskId) => {
    console.log("dragstart taskId", taskId)

    e.dataTransfer.setData('taskId', taskId);
    console.log("dragstart")
  };

  const handleDragOver = (e) => {
    console.log("dragOver")

    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    console.log("dragdrop", tasks)

    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    console.log("dragdrop taskId", taskId)
    const sourceStatus = tasks.todo.some((task) => task._id === taskId)
      ? 'todo'
      : tasks.doing.some((task) => task._id === taskId)
        ? 'doing'
        : 'done';

    if (sourceStatus !== status) {
      const updatedTasks = { ...tasks };
      const taskToMove = updatedTasks[sourceStatus].find(
        (task) => task._id === taskId
      );

      if (taskToMove) {
        // Remove the task from the source status
        updatedTasks[sourceStatus] = updatedTasks[sourceStatus].filter(
          (task) => task._id !== taskId
        );

        // Add the task to the destination status
        updatedTasks[status].push({ ...taskToMove, status });

        // Update the state with the modified tasks
        setTasks(updatedTasks);

        // Update the task status in the backend (assuming you have an updateTask function)
        updateTask({ ...taskToMove, status });
      }
    }
  };

  return (
    <div className="app">
      <h1>Kanban Task Management</h1>
      <div className='applayout'>
        <AddTaskForm addTask={addTask} newTask={newTask} setNewTask={setNewTask} status='todo' />
        <div className="kanban-board " >
          {['todo', 'doing', 'done'].map((status) => (
            <div key={status} className="column"  onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)} >
              <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
              {tasks[status].map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  onDragStart={(e) => handleDragStart(e, task._id)}
                  draggable
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;