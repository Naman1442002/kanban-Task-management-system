import React from 'react';

function AddTaskForm({ addTask, newTask, setNewTask}) {
  const handleTitleChange = (e) => {
    setNewTask({ ...newTask, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewTask({ ...newTask, description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim() === '') return; // Don't add empty tasks

    // Call the addTask function from props to add the task
    addTask(newTask);

    // Clear the form fields
    setNewTask({ title: '', description: '' });
  };

  return (
    <div className="add-task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleDescriptionChange}
        ></textarea>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;
