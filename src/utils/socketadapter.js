import io from 'socket.io-client';
import CryptoJS from "crypto-js";

var socketadapter = {};
var BASEURL = process.env.VUE_APP_API_PATH;


(function (e) {
    var stateListener = function (newState) {
        // console.log("innerListener:" + newState);
    };
    var stateChanged = function (newState) {
        if (stateListener) {
            stateListener(newState);
        }
    };
    e.cryptojs=function () {
        return CryptoJS;
    };
    e.client = null;
    e.state = 0;
    e.check = function () {
        try {
            if (e.client === null || e.state === 0) {
                var tm = (new Date().getTime()) + "";
                let cryptojs=e.cryptojs();
                let ssec="lyy3wysff4waedzc";
                var token = cryptojs.HmacSHA1(tm, ssec).toString(CryptoJS.enc.Hex);
                let connectParams={};
                connectParams.reconnection=false;
                connectParams.transports=['websocket'];
                e.client = io.connect(BASEURL + "?tm=" + tm + "&token=" + token, connectParams);
                e.state = 1;
                stateChanged(e.state);
                e.client.on('connect', function () {
                    if (e.client && e.client.connected) {
                        e.state = 2;
                        stateChanged(e.state);
                        console.log("连接成功");
                        console.log("socket.io id:" + e.client.id);
                    } else {
                        e.state = 0;
                        stateChanged(e.state);
                    }
                });
                e.client.on('disconnect', function () {
                    e.state = 0;
                    stateChanged(e.state);
                });
                e.client.on('connect_error', (err) => {
                    e.state = 0;
                    stateChanged(e.state);
                });
                e.client.on('error', (err) => {
                    e.state = 0;
                    stateChanged(e.state);
                });
                e.client.on('reconnect_attempt', () => {
                    console.log("重试");
                    if (e.client) {
                        e.client.io.opts.transports = ['polling', 'websocket'];
                    }
                });
            }
        } catch (ex) {

        }
    };
    e.onStateChange = function (callback) {
        stateListener = callback;
    };
})(socketadapter);


export default socketadapter;