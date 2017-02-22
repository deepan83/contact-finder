import React, { Component } from 'react';

class ValidationMessage extends Component {

  render() {
    if (this.props.message) {
      return (
        <p className="validation-message">{this.props.message}</p>
      )
    } else {
      return null;
    }
  }
}

export default ValidationMessage;
