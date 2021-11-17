import "./item-add-form.css";
import React from "react";

export default class ItemAddForm extends React.Component {
  constructor() {
    super();

    this.state = {
      label: "",
    };

    this.onLabelChange = e => {
      this.setState({ label: e.target.value });
    };

    this.onSubmit = e => {
      e.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({ label: "" });
    };
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Add item"
          value={this.state.label}
          onChange={this.onLabelChange}
        ></input>
        <button className="btn btn-outline-secondary">Add item</button>
      </form>
    );
  }
}
