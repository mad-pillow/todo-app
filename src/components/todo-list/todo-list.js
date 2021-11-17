import React from "react";

import TodoListItem from "../todo-list-item";
import "./todo-list.css";

export default class TodoList extends React.Component {
  render() {
    const { todos, onDeleted, onToggleDone, onToggleImportant } = this.props;

    const elements = todos.map(item => {
      const { id, ...itemProps } = item;

      return (
        <li key={id} className="list-group-item">
          <TodoListItem
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => {
              onToggleDone(id);
            }}
            onToggleImportant={() => {
              onToggleImportant(id);
            }}
          />
        </li>
      );
    });

    return <ul className="list-group todo-list">{elements}</ul>;
  }
}
