import React, {Component} from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {
                lat: 0,
                lng: 0
            },
            containerStyle:{
                width: '400px',
                height: '400px'
            },
        }
    };

    handleChange = address => {
        this.setState({ address });
      };

    handleSelect = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          console.log('Success', latLng)
              this.setState({ address })
              this.setState({ mapCenter: latLng })

        })
        .catch(error => console.error('Error', error));
    };

    componentDidMount() {
        if('geolocation' in navigator) {
            console.log("available")
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    mapCenter: {
                        lat:position.coords.latitude,
                        lng:position.coords.longitude
                    }
                })
                fetch("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="
                    +position.coords.longitude+"&appid=cdf05d929ed5cfa526764c43d2b832d2")
                    .then(response =>response.json())
                    .then(data => {
                        this.setState({
                            picture: 'http://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png',
                            description:data.weather[0].description,
                            wind:data.wind.speed,
                            temperature:Math.floor(data.main.temp-273)+'C'

                        })
                    })
            })
        } else {
            console.log("not available")
        }
    }

    render() {
        return (
            <div>
                <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

                <Map
                google={this.props.google}
                initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                center={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
            >
                <Marker
                    position={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                />
            </Map>

            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBFItuGWneUe_7082cHZtJ8YxTtR8krmCw')
})(MapContainer)
