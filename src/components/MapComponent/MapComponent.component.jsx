import React, {useState} from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { MAIN_POINTS } from './../../utilities/constants';
import RouteService from './../../servicies/route.service';
import SecondsMovement from './../secondsMovement/secondsMovement.component';

export default ({listId}) => {
  let path = [];
  let lats = {};
  let lngs = {};
  let startPointReference;
  let addPathPoint = (newPoint) => {
    if (!lats[newPoint.lat]  && !lngs[newPoint.lng]) {
      path.push(newPoint);
      lats[newPoint.lat] = true;
      lngs[newPoint.lng] = true;
    }
  }
  RouteService.createConection(addPathPoint);
  class Map extends React.Component {
    state = {
      progress: [],
    }
    initialDate = new Date();
    speed = 10;
    getDistance = () => {
      // seconds between when the component loaded and now
      const differentInTime = (new Date() - this.initialDate) / 1000 // pass to seconds
      return differentInTime * this.speed // d = v*t -- thanks Newton!
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
        this.checkPath();
        this.setState({ progress });
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
      startPointReference = { lat: position.lat(), lng: position.lng() };
      progress = progress.concat(position)
      this.setState({ progress })
    }

    checkPath = () => { 
      if (path.length == 0){
        RouteService.callSocket(JSON.stringify({ type: 'init', routeId: listId  }));
      } 
      RouteService.callSocket(JSON.stringify({ type: 'next', routeId: listId  }));
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
    }
  
    componentWillMount = () => {
      this.checkPath();
    }

    changeSpeed = () => {
      let index = path.length - 1;
      path = [startPointReference];
      this.state.progress = [startPointReference];
      lats = {};
      lngs = {};
      this.speed = RouteService.getSpeed();
      RouteService.callSocket(JSON.stringify({ type: 'setIndex', index: index, routeId: listId }));
      RouteService.setTriggerInitialPoint(false);
    }
  
    render = () => {
      if (RouteService.getTriggerInitialPoint()) {
        this.changeSpeed();
      }
      return (
        <GoogleMap
          defaultZoom={16}
          defaultCenter={ MAIN_POINTS.defaultCenter[listId] }
          >
            <Polyline path={path} options={{ strokeColor: "#FF0000 "}} />
            {(
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
      <SecondsMovement></SecondsMovement>
      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: '900px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
)}