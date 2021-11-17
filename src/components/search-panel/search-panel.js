import React from "react";

import "./search-panel.css";

export default class SearchPanel extends React.Component {
  render() {
    const { onSearchChange } = this.props;
    return (
      <input type="text" className="form-control search-input" placeholder="Type to search" onChange={onSearchChange} />
    );
  }
}
