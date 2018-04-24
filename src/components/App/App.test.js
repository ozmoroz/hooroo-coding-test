import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App, { API_GET_HOTELS } from './App';
import HotelsList from '../HotelsList';

/* global describe it shallow */

describe('<App/> component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('on successful data fetch', () => {
    const API_RESPONSE = [
      {
        id: 'cxd650nuyo',
        title: 'Courtyard by Marriott Sydney-North Ryde',
        address: '7-11 Talavera Rd, North Ryde',
        image: 'https://unsplash.it/145/125/?random',
        rating: 4,
        ratingType: 'self',
        promotion: 'Exclusive Deal',
        name: 'Deluxe Balcony Room',
        price: 329,
        savings: 30,
        freeCancellation: true
      },
      {
        id: 'mesq6mggyn',
        title: 'Primus Hotel Sydney',
        address: '339 Pitt St, Sydney',
        image: 'https://unsplash.it/145/125/?random',
        rating: 5,
        ratingType: 'self',
        promotion: 'Exclusive Deal',
        roomName: 'Deluxe King',
        price: 375,
        savings: 28,
        freeCancellation: true
      }
    ];
    let axiosMock;

    beforeEach(() => {
      // This sets the mock adapter on the default instance
      axiosMock = new MockAdapter(axios);
      // Mock any GET request to /users
      // arguments for reply are (status, data, headers)
      axiosMock.onGet(API_GET_HOTELS).reply(200, API_RESPONSE);
    });

    it('loads hotels data into state in componentDidMount', async () => {
      const wrapper = shallow(<App />);
      await wrapper.instance().componentDidMount();

      expect(wrapper.state('hotels')).toEqual(API_RESPONSE);
    });

    it('Renders <HotelsList/> compoment', async () => {
      const wrapper = shallow(<App />);
      await wrapper.instance().componentDidMount();

      // Force update to sync component with state
      wrapper.update();

      expect(
        wrapper.containsMatchingElement(<HotelsList hotels={API_RESPONSE} />)
      ).toBe(true);
    });
  });

  describe('on XHR error', () => {
    const API_RESPONSE = {
      message: 'Something wrong has happened'
    };

    let axiosMock;

    beforeEach(() => {
      // This sets the mock adapter on the default instance
      axiosMock = new MockAdapter(axios);
      // Mock any GET request to /users
      // arguments for reply are (status, data, headers)
      axiosMock.onGet(API_GET_HOTELS).reply(400, API_RESPONSE);
    });

    it('sets error message into state and shows error upon an XHR error ', async () => {
      const wrapper = shallow(<App />);
      await wrapper.instance().componentDidMount();

      expect(wrapper.state('xhrError')).toEqual(
        `Request failed with status code 400: ${API_RESPONSE.message}`
      );
    });

    it('renders error message ', async () => {
      const wrapper = shallow(<App />);
      await wrapper.instance().componentDidMount();

      // Force update to sync component with state
      wrapper.update();

      expect(
        wrapper.containsMatchingElement(
          <div className="card-body bg-danger text-white">
            Request failed with status code 400: Something wrong has happened
          </div>
        )
      ).toBe(true);
    });
  });
});
