// @flow

import React, { Component } from 'react';
import axios from 'axios';
import HotelsList from '../HotelsList';
import type { Hotels } from '../../types/hotel.js';
import type { CancelTokenSource } from 'axios';

// API endpoint
export const API_GET_HOTELS =
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
  axiosCancelSource: CancelTokenSource = axios.CancelToken.source();

  componentDidMount() {
    // Reset XHR Error, get Axios cancel token
    this.setState({ xhrError: null });
    // Fetch the list of hotels
    // Return promise to help with unit testing
    return axios
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
          if (error.response) {
            this.setState({
              xhrError: `${error.message}: ${error.response.data.message}`
            });
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            this.setState({ xhrError: error.message });
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            this.setState({ xhrError: error.message });
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
      <div className="App container">
        {this.state.xhrError !== null ? (
          <div className="card">
            <div className="card-body bg-danger text-white">
              {this.state.xhrError}
            </div>
          </div>
        ) : (
          <HotelsList hotels={this.state.hotels} />
        )}
      </div>
    );
  }
}

export default App;
