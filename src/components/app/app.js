import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";

import "./app.css";

export default class App extends React.Component {
  constructor() {
    super();

    this.index = 0;

    this.createTodoItem = label => {
      return { label: label, important: false, id: this.index++, done: false };
    };

    this.state = {
      todoData: [
        this.createTodoItem("Become the best Web Developer"),
        this.createTodoItem("Learn back-end"),
        this.createTodoItem("Feel happy"),
      ],
      term: "",
      filter: "all",
    };

    this.deleteItem = id => {
      this.setState(({ todoData }) => {
        const result = todoData.filter(item => item.id !== id);

        return {
          todoData: result,
        };
      });
    };

    this.addItem = text => {
      const result = [...this.state.todoData, this.createTodoItem(text)];
      this.setState(({ todoData }) => {
        return { todoData: result };
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const result = [...arr];
      result.map(item => {
        return item.id === id ? (item[propName] = !item[propName]) : item;
      });
      return { todoData: result };
    };

    this.onToggleDone = id => {
      this.setState(({ todoData }) => {
        return this.toggleProperty(todoData, id, "done");
      });
    };

    this.onToggleImportant = id => {
      this.setState(({ todoData }) => {
        return this.toggleProperty(todoData, id, "important");
      });
    };

    this.searchItems = (array, term) => {
      return array.filter(item => item.label.toLowerCase().includes(term.toLowerCase()));
    };

    this.onSearchChange = e => {
      this.setState({ term: e.target.value });
    };

    this.onFilterChange = filter => {
      this.setState({ filter: filter });
    };

    this.filterItems = (array, filter) => {
      switch (filter) {
        case "all":
          return array;
        case "active":
          return array.filter(item => !item.done);
        case "done":
          return array.filter(item => item.done);
        default:
          return array;
      }
    };
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filterItems(this.searchItems(todoData, term), filter);
    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter onFilterChange={this.onFilterChange} filter={filter} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
