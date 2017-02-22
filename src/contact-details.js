import React, { Component } from 'react';
import ContactAddress from './contact-address.js'

class ContactDetail extends Component {

 constructor() {
   super();
   this.state = {showSecondaryAddress: false}
   this.showSecondaryAddress = this.showSecondaryAddress.bind(this);
   this.hideSecondaryAddress = this.hideSecondaryAddress.bind(this);
 }

 displayContactDetails() {
   let contact = this.props.contact,
     showSecondaryAddress = this.state.showSecondaryAddress;

   if (contact) {
     let primaryAddress = contact.Addresses.Address.find((address) => {
       return address.Type === 'Constituency';
     }),
       secondaryInformationArea = <button onClick={this.showSecondaryAddress} className="show-constituency-address">Show parliamentary address</button>;

     if (showSecondaryAddress) {
       let secondaryAddress = contact.Addresses.Address.find((address) => {
         return address.Type === 'Parliamentary';
       });

       secondaryInformationArea = <div><button onClick={this.hideSecondaryAddress}>Hide parliamentary address</button><ContactAddress address={secondaryAddress}/></div>;
     }

     return (
       <div>
       <br/>
       <h3>Your member of parliament</h3>
       <div className="contact-details">
         <ul>
           <li><strong>Name</strong>: {contact.DisplayAs}</li>
           <li><strong>Constituency</strong>: {contact.MemberFrom}</li>
           <li><strong>Party</strong>: {contact.Party['#text']}</li>
         </ul>
       </div>
       <ContactAddress address={primaryAddress}/>
       {secondaryInformationArea}
      </div>
    );
   }
 }

 showSecondaryAddress() {
   this.setState({showSecondaryAddress: true});
 }

 hideSecondaryAddress() {
   this.setState({showSecondaryAddress: false});
 }

  render() {
    return (
      <div>
        {this.displayContactDetails()}
      </div>
    )
  }
}

export default ContactDetail;
