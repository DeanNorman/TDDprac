import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';

export const TodoList = (props) => {
  return(
    <div className="Todo-List">
      <ul>
        {props.todos.map( todos =>
          <TodoListItem handleToggle={props.handleToggle} key={todos.id} {...todos} />
        )}
      </ul>
    </div>
  )
}

TodoList.propTypes = {
   todos: PropTypes.array.isRequired,
};
