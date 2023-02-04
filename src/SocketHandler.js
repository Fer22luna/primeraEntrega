
const EventEmitter = require("events");
const io = require("socket.io");
const {httpServer} = require("./index")

class SocketHandler extends EventEmitter {

    constructor(httpServer) {
        super();
        this.socket = io(httpServer);
    }

    emit(eventName, data) {
        this.socket.emit(eventName, data);
    }

    on(eventName, callback) {
        this.socket.on(eventName, callback);
    }
}

module.exports = SocketHandler;