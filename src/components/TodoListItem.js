import React from 'react';
import PropTypes from 'prop-types';

const TodoListItem = (props) => {
  return(
    <li key={props.id}>
      <input type="checkbox"
        onChange={() => props.handleToggle(props.id)}
        defaultChecked={props.isComplete}/> {props.name}
    </li>
  )
};

TodoListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number,
}

export default TodoListItem;
