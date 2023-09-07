import React from 'react';

function EditTask({
  editedTask,
  handleSaveEdit,
  handleTitleChange,
  handleDescriptionChange,
  handleCancelEdit,
}) {
  return (
    <div className='edit-task'>
      <input
        type="text"
        value={editedTask.title}
        onChange={handleTitleChange}
      />
      <textarea
        value={editedTask.description}
        onChange={handleDescriptionChange}
      ></textarea>
      <button onClick={handleSaveEdit}>Save</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
}

export default EditTask;
