import React, { Component } from 'react';
import './App.css';
import ContactDetail from './contact-details.js';
import ValidationMessage from './validation-message.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      member: null,
      postcode: '',
      validationMessage: ''
    };

    this.findContact = this.findContact.bind(this);
    this.handlePostcodeInput = this.handlePostcodeInput.bind(this);
  }

  findContact(e) {
    e.preventDefault();

    const postcode = this.state.postcode.replace(/\s/g, '').trim();

    if (!this.validatePostcode(postcode)) {
      this.setState({validationMessage: 'Please enter a valid postcode'});
      return;
    } else {
      this.setState({validationMessage: ''});

      fetch(`https://api.postcodes.io/postcodes/${postcode}`)
        .then((response) => {

          if (!response.ok && response.status === 404) {
            throw new Error(`postcode not found`);
          }

          response.json()
            .then((json) => {
              fetch(`https://treatsmaproxy.herokuapp.com/membersdataplatform/services/mnis/members/query/House=Commons%7Cconstituency=${json.result.parliamentary_constituency}/Addresses/`, {
                headers: new Headers({
                  'Accept': 'application/json'
                })
              })
              .then((response) => {

                if (!response.ok) {
                  throw new Error();
                }

                response.json()
                  .then((json) => {
                    this.setState({'member': json.Members.Member});
                  })
              })
              .catch((err) => {
                this.handleError(err);
              });
            })
        })
        .catch((err) => {
           this.handleError(err);
        });
    }
  }

  handlePostcodeInput(e) {
   this.setState({
     postcode: e.target.value,
     validationMessage: ''
   });
  }

  handleError(err) {
    if (err.message === 'postcode not found') {
      this.setState({validationMessage: 'Please enter a valid postcode'});
    } else {
      this.setState({validationMessage: `Sorry, I've encountered an error. Please try again later`});
    }
  }

  validatePostcode(postcode) {
    const postcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/;

    return postcodeRegex.test(postcode);
  }

  render() {
    return (
      <div className="contact-finder">
        <form>
          <input type="text" className="postcode" value={this.state.postcode} onChange={this.handlePostcodeInput} placeholder="Postcode"/>
          <ValidationMessage message={this.state.validationMessage}/>
          <br/>
          <button className="find" onClick={this.findContact}>Find your MP</button>
        </form>
        <ContactDetail contact={this.state.member}/>
      </div>
    );
  }
}

export default App;
