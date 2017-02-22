import React, { Component } from 'react';

class ContactAddress extends Component {

  consolidateAddress(address) {
    let addresses = [
      address.Address1,
      address.Address2,
      address.Address3,
      address.Address4,
      address.Address5,
      address.Postcode
    ];

    return addresses
      .filter((address) => {
        return address !== null;
      })
      .join(', ');
  }

  render() {
    if (this.props.address) {
      return (
        <div>
          <h3>{this.props.address.Type} contact details</h3>
          <div className="contact-details">
            <ul>
              <li><strong>Address</strong>: {this.consolidateAddress(this.props.address)}</li>
              <li><strong>Email</strong>: {this.props.address.Email}</li>
              <li><strong>Phone</strong> : {this.props.address.Phone}</li>
            </ul>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default ContactAddress;
