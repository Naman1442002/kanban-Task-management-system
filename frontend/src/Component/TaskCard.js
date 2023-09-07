import React, { useState } from 'react';
import EditTask from '../Component/EditTaskForm';

function TaskCard({ task, updateTask, deleteTask, onDragStart }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleSaveEdit = () => {
    updateTask(editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };

  const handleTitleChange = (e) => {
    setEditedTask({ ...editedTask, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setEditedTask({ ...editedTask, description: e.target.value });
  };

  return (
    <div className="task-card" 
    draggable="true" // Add this attribute to make it draggable
    onDragStart={(e) => onDragStart(e, task._id)}
    >
      {isEditing ? (
        <EditTask
          editedTask={editedTask}
          handleSaveEdit={handleSaveEdit}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
