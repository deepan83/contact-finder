import React, { Component } from 'react';
import ContactAddress from './contact-address.js'

const PRIMARY_ADDRESS_TYPE = 'Constituency';
const SECONDARY_ADDRESS_TYPE = 'Parliamentary';

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
     let primaryAddress = null,
       secondaryAddress = null,
       secondaryInformationArea = null,
       hasAddressList = !!contact.Addresses.Address.length,
       primaryAndSecondaryAddressesInList = (hasAddressList &&
         contact.Addresses.Address.filter((address) => {
           return address.Type === PRIMARY_ADDRESS_TYPE || address.Type === SECONDARY_ADDRESS_TYPE;
         })) || [],
       hasBothPrimaryAndSecondaryAddressesInList = primaryAndSecondaryAddressesInList.length === 2,
       hasOnlySecondaryAddressInList = !hasBothPrimaryAndSecondaryAddressesInList &&
          primaryAndSecondaryAddressesInList.find((address) => {
            return address.Type === SECONDARY_ADDRESS_TYPE;
          });

     if (hasBothPrimaryAndSecondaryAddressesInList) {
       primaryAddress = primaryAndSecondaryAddressesInList.find((address) => {
         return address.Type === PRIMARY_ADDRESS_TYPE ;
       });

       secondaryInformationArea = <button onClick={this.showSecondaryAddress} className="show-constituency-address">Show parliamentary address</button>;

       if (showSecondaryAddress) {
         secondaryAddress = primaryAndSecondaryAddressesInList.find((address) => {
           return address.Type === SECONDARY_ADDRESS_TYPE;
         });

         secondaryInformationArea = <div><button onClick={this.hideSecondaryAddress}>Hide parliamentary address</button><ContactAddress address={secondaryAddress}/></div>;
       }
     } else if (hasOnlySecondaryAddressInList) {
       primaryAddress = primaryAndSecondaryAddressesInList.find((address) => {
         return address.Type === SECONDARY_ADDRESS_TYPE;
       });
     } else {
       primaryAddress = contact.Addresses.Address;
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
