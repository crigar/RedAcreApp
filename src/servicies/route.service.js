import CoorUtilities from './../utilities/coor.utilities';

let socket = new WebSocket('ws://localhost:8000');
let callBackSaved;
let secondsMovement = 10;
let lastPoint = {lat: 0, lng: 0};
let startPointReferenceDate;

const RouteService = {
    createConection(callBackk) {
        callBackSaved = callBackk;
        socket.addEventListener('open', event => console.log('conected'));
    },
    getNextPoint(point) {       
        socket.send(point);
        socket.addEventListener('message', event => {
            callBackSaved(JSON.parse(event.data));
        } );      
    },
    setSecondsToMovement(seconds) {
        secondsMovement = seconds;
    },
    getSecondsToMovement() {
        return secondsMovement;
    },
    setStartPointReferenceDate(date) {
        startPointReferenceDate = date;
    },
    getStartPointReferenceDate() {
        return startPointReferenceDate;
    },
    setLastPoint(point) {
        lastPoint = point;
    },
    getLastPoint() {
        return lastPoint;
    },
 

}

export default RouteService;