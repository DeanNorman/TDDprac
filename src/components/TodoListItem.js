import React from 'react';
import PropTypes from 'prop-types';
import { partial } from '../lib/utils'

const TodoListItem = (props) => {
  // const handleToggle = props.handleToggle.bind(null, props.id);
  const handleToggle = partial(props.handleToggle, props.id);
  return(
    <li key={props.id}>
      <input type="checkbox"
        onChange={handleToggle}
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
