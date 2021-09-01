import React, { Component } from 'react';
import axios from 'axios';

const options = [
  {
    label: "EUR",
    value: "EUR",
  },
  {
    label: "CHF",
    value: "CHF",
  },
  {
    label: "GBP",
    value: "GBP",
  },
  {
    label: "USD",
    value: "USD",
  },
];

class App extends Component{

  constructor(props) {
    super(props);
    var today = new Date(),
            date =  today.getUTCDay() + '-' + (today.getUTCMonth() + 1) + '-' + today.getUTCFullYear() + ', ' + today.getUTCHours() + ':' + today.getUTCMinutes() +' UTC  - clause de non reponsabilité';
    this.state = {
        from: "",
        to: "",
        result: [],
        showResult: false,
        selectedFromOption: 'EUR',
        selectedToOption: 'EUR',
        date: date
    }

    this.handleFromSelectChange = this.handleFromSelectChange.bind(this);
    this.handleToSelectChange = this.handleToSelectChange.bind(this);
  }

  handleFromSelectChange(e) {
    this.setState({ selectedFromOption: e.target.value });
  }

  handleToSelectChange(e) {
    this.setState({ selectedToOption: e.target.value });
  }

  handleFromChange = event => {
    this.setState({from: event.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({showResult: true})
    axios
      .get('http://localhost:3001/currencies', {
        params: {
            from: this.state.selectedFromOption,
            to: this.state.selectedToOption
        }
      })
      .then(response => {
        this.setState({
          result: response.data.value,
          to: Number(response.data.value) * Number(this.state.from)
        });
    })
    .catch(err => {
        console.log(err)
    });
  };

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
          <div className="same">
            <div className="same-line">
              {this.state.showResult && <p>1 {this.state.selectedFromOption} égal:<p style={{ size: '120px'}}>{this.state.result}  {this.state.selectedToOption}</p> <p style={{ color: '#7a7b7c', size: '12px'}}>{this.state.date}</p></p>}
              <input style={{ width: '10%' , marginRight: '20px'}}
                type="number"
                className="form-control"
                name="from"
                onChange={this.handleFromChange}
              />
            <select value= {this.state.selectedFromOption} onChange={this.handleFromSelectChange}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
            </div>
            <br />
            <div  className="same-line">
              <input style={{ width: '10%' , marginRight: '20px'}}
                type="text"
                className="form-control"
                name="to"
                value= {this.state.to}
                disabled = {true}
              />
              <select value= {this.state.selectedToOption} onChange={this.handleToSelectChange}>
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}           
              </select>
            </div>
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className="btn btn-success" type="submit" onClick={this.handleSubmit}>
                Convert
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    );
  }
}

export default App;