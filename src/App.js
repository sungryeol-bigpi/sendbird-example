import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import sb from './sendbird';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sb: new sb('833BB791-D31C-4277-A840-70991E0BBD17'),
      user: null,
      channel: null,
      channels: [],
      messages: [],
      currentMsg: '',
    };
  }
  
  async connect() {
    console.log('connection req');
    const user = await this.state.sb.connect();
    const channel = await this.state.sb.connectChannel('sendbird_open_channel_48868_c7b51ce319f8414d1c6ce6ad8d016c004eaa97e9');
    const channels = await this.state.sb.getChannels();
    this.setState({
      user,
      channel,
      channels,
    });
  }

  sbControl() {
    const itmChannel = (channel, idx) => <li key={idx}>{channel.name}</li>
    return (<div>
        <p>connected</p>
        <ul>
          {!this.state.channels ? null: this.state.channels.map(itmChannel)}
        </ul>
      </div>);
  }

  render() {
    this.connect = this.connect.bind(this);
    this.sbControl = this.sbControl.bind(this);
    return (
      <div className="App">
        <h1>sendbird example</h1>
        { this.state.user ? this.sbControl() : <button onClick={this.connect}>connect</button> }
      </div>
    );
  }
}

export default App;
