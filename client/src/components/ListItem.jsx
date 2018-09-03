import React from 'react';

const ListItem = (props) => {

  return <div>
      <h5>
        {props.task.task}&nbsp;
        <button onClick={props.deleteTask}>Delete</button>
        <button onClick={props.editTask}>Edit</button>
      </h5>
    </div>;
}

export default ListItem;