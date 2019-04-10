import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../index.css';

class Donation extends Component {
  state = {
    max: 5000,
    donors: 0,
    input: 0,
    remaining: 5000,
    error: null,
    isButtonDisabled: true
  };

  handleInput = (event) => {
    const num = event.target.value;
    if(num < 5) {
      this.setState({ error: 'Donation must be greater than $5', isButtonDisabled: true });
      this.clearError();
    } else {
      this.setState({ input: num, error: null, isButtonDisabled: false });
    }
  }

  clearError = () => {
    setTimeout(() => {
      this.setState({error: null});
    }, 2000);
  }

  handleClick = () => {
    const { input, donors, remaining } = this.state;
    console.log(input);
    this.refs.userInput.value = '';
    this.setState({
      remaining: remaining - input,
      donors: donors + 1,
      input: 0,
      isButtonDisabled: true
    });
  }

  resetState = () => {
    this.setState({
      max: 5000,
      donors: 0,
      input: 0,
      remaining: 5000,
      error: null,
      isButtonDisabled: true
    });
  }

  render() {
    const { max, error, remaining, donors, isButtonDisabled } = this.state;
    let successAlert;
    if(remaining <= 0 ) {
      successAlert = (
        <Alert variant="success" dismissible onClose={this.resetState}>
          <Alert.Heading>Yay, we did it!!</Alert.Heading>
          <hr/>
          <p>
            Thanks for your donations.  We reached our goal of $5,000!!!
          </p>
        </Alert>
      );
    }
    return (
      <div className="Donation">
        { successAlert }
        <div className="Donation-alert">
          <p className="Donation-alert-text"><b>${remaining <= 0 ? '0' : remaining.toLocaleString('en')}</b> still needed to fund this project</p>
        </div>
        <div className="Donation-alert-triangle"></div>
        <div className="Donation-progress-box">
          <div>
            <ProgressBar now={max - remaining} max={max}/>
          </div>
          <h1 className="Donation-header">Only four days left to fund this project</h1>
          <p className="Donation-content">Join the <b>{donors}</b> other donors who already supported this project.</p>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="input-prepend">$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.handleInput} type="number" ref="userInput"/>
            <InputGroup.Append>
              <Button className="input-button" variant="secondary" onClick={this.handleClick} disabled={isButtonDisabled}>Give Now</Button>
            </InputGroup.Append>
          </InputGroup>
          <p className="Donation-error">{ error }</p>
        </div>
      </div>
    );
  }
}

export default Donation;