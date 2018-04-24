// @flow

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import type { Hotels } from '../../types/hotel.js';
import type { CancelTokenSource } from 'axios';

// API endpoint
const API_GET_HOTELS =
  'https://raw.githubusercontent.com/ozmoroz/hooroo-coding-test/master/data.json';

// Flow type definitions

type Props = {};
type State = {
  hotels: ?Hotels, // Hotels data payload
  xhrError: ?string // XHR Error
};

class App extends Component<Props, State> {
  state = { axiosCancelSource: null, hotels: null, xhrError: null }; // the initial state
  // Axios cancel token source, used to cancel an HXR request
  axiosCancelSource:CancelTokenSource = axios.CancelToken.source();

  componentDidMount() {
    // Reset XHR Error, get Axios cancel token
    this.setState({ xhrError: null });
    // Fetch the list of hotels
    // Since our goal is to perform complex transformations or/and filtering
    // on the data, it makes sense to store it in a denormalized state.
    axios
      .get(API_GET_HOTELS, {
        cancelToken: this.axiosCancelSource && this.axiosCancelSource.token
      })
      .then(response => {
        this.setState({ hotels: response.data, xhrError: null });
        //console.dir(this.state);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          this.setState({ xhrError: error.message });
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        }
      });
  }

  componentWillUnmount() {
    // Cancel Axios XHR request if it is in progress
    if (this.axiosCancelSource) {
      this.axiosCancelSource.cancel('Application is terminating');
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.xhrError ? (
          <div className="card">
            <div className="card-body bg-danger text-white">
              {this.state.xhrError}
            </div>
          </div>
        ) : (
          <div>App started successfully</div>
        )}
      </div>
    );
  }
}

export default App;
