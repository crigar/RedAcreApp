import React, {useState} from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { MAIN_POINTS } from './../../utilities/constants';
import RouteService from './../../servicies/route.service';
import SecondsMovement from './../secondsMovement/secondsMovement.component';

export default ({listId}) => {
  let [secondsMovement, setSeconds] = useState(1);
  let path = RouteService.getPath(listId);
  console.log(listId)
  class Map extends React.Component {
    state = {
      progress: [],
    }
    velocity = secondsMovement;
    initialDate = new Date()
  
    getDistance = () => {
      // seconds between when the component loaded and now
      const differentInTime = (new Date() - this.initialDate) / 1000 // pass to seconds
      return differentInTime * this.velocity // d = v*t -- thanks Newton!
    }
  
    componentDidMount = () => {
      this.interval = window.setInterval(this.moveObject, 1000)
    }
  
    componentWillUnmount = () => {
      window.clearInterval(this.interval)
    }
  
    moveObject = () => {
      const distance = this.getDistance()
      if (! distance) {
        return
      }
  
      let progress = path.filter(coordinates => coordinates.distance < distance)
  
      const nextLine = path.find(coordinates => coordinates.distance > distance)
      if (! nextLine) {
        this.setState({ progress })
        return // it's the end!
      }
      const lastLine = progress[progress.length - 1]
  
      const lastLineLatLng = new window.google.maps.LatLng(
        lastLine.lat,
        lastLine.lng
      )
  
      const nextLineLatLng = new window.google.maps.LatLng(
        nextLine.lat,
        nextLine.lng
      )
  
      // distance of this line 
      const totalDistance = nextLine.distance - lastLine.distance
      const percentage = (distance - lastLine.distance) / totalDistance
  
      const position = window.google.maps.geometry.spherical.interpolate(
        lastLineLatLng,
        nextLineLatLng,
        percentage
      )
  
      progress = progress.concat(position)
      this.setState({ progress })
    }
  
    componentWillMount = () => {
      path = path.map((coordinates, i, array) => {
        if (i === 0) {
          return { ...coordinates, distance: 0 } // it begins here! 
        }
        const { lat: lat1, lng: lng1 } = coordinates
        const latLong1 = new window.google.maps.LatLng(lat1, lng1)
  
        const { lat: lat2, lng: lng2 } = array[0]
        const latLong2 = new window.google.maps.LatLng(lat2, lng2)
  
        // in meters:
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          latLong1,
          latLong2
        )
  
        return { ...coordinates, distance }
      })
  
      console.log(this.path)
    }
  
    render = () => {
      return (
        <GoogleMap
          defaultZoom={16}
          defaultCenter={ MAIN_POINTS.defaultCenter }
          >
            <Marker position={ MAIN_POINTS.house } />
            <Marker position={ MAIN_POINTS.job } />
            <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />
            { this.state.progress && (
              <>
                <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 "}} />
                <Marker position={this.state.progress[this.state.progress.length - 1]} />
              </>
            )}
        </GoogleMap>
      )
    }
  }
  const MapComponent = withScriptjs(withGoogleMap(Map))
  return (
    <div>
      <SecondsMovement toggleSeconds={(seconds) => setSeconds(seconds)}></SecondsMovement>
      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: '900px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
)}