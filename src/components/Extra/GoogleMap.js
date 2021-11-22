import React, {Component} from "react";
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

    componentDidMount() {
        this.setState({
            mapCenter: {
                lat: this.props.lat,
                lng: this.props.lng
            },
        })
    }

    render() {
        return (
            <div>
                <Map
                    containerStyle ={
                        this.state.containerStyle
                    }
                    google={this.props.google}
                    initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    center={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    zoom={5}
                >
                    <Marker
                        position={{
                            lat: this.props.lat,
                            lng: this.props.lng
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
