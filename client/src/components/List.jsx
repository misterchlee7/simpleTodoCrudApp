import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => {

  return (
    <div>
      {props.taskList.map(task => {
        return <ListItem key={task._id} task={task} deleteTask={props.deleteTask.bind(this, task._id)} editTask={props.editTask.bind(this, task._id, task.task)} />
      })}
    </div>
  );
}

export default List;