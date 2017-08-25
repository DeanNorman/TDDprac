import React from 'react';
import PropTypes from 'prop-types';

export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input type="text"
      onChange={props.handleChange}
      value={props.currentTodo} />
  </form>)

  TodoForm.propTypes = {
    currentTodo: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };
export default TodoForm;
