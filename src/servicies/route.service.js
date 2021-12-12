import CoorUtilities from './../utilities/coor.utilities';

let socket = new WebSocket('ws://localhost:8000');
let callBackSaved;
let speed = 20;
let triggerInitialPoint = false;

const RouteService = {
    createConection(callBackk) {
        callBackSaved = callBackk;
        socket.addEventListener('open', event => console.log('conected'));
    },
    callSocket(info) {       
        socket.send(info);
        socket.addEventListener('message', event => {
            callBackSaved(JSON.parse(event.data));
        } );      
    },
    
    setSpeed(newSpeed) {
        speed = newSpeed;
    },
    getSpeed() {
        return speed;
    },
    setTriggerInitialPoint(value) {
        triggerInitialPoint = value;
    },
    getTriggerInitialPoint() {
        return triggerInitialPoint;
    }
}

export default RouteService;