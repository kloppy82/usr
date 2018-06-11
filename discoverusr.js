const net=require('net');
const dgram = require('dgram');

const PORT = 48899;
const HOST = '255.255.255.255';
const TIMEOUT = 3000;

const message = new Buffer('www.usr.cn');
const upd_client = dgram.createSocket('udp4');

const timeoutObj = setTimeout(close_client, TIMEOUT);


module.exports.discoverDevices = function() {

	upd_client.bind(()=>{upd_client.setBroadcast(true);});

	upd_client.on('message',(msg,info)=>{
		clearTimeout(timeoutObj);
		close_client(msg,info);
	});

	upd_client.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
		if (err) throw err;
		//console.log('UDP message sent to ' + HOST +':'+ PORT);
	});
}

function close_client(msg,info){
	//console.log('Received %d bytes from %s:%d Message: "%s"\n',msg.length, info.address, info.port,msg.toString());
	if(msg!=undefined && info!=undefined){
		console.log(info.address);
	}
	else{
		console.log('Serial Converter unreachable')
	}
	upd_client.close();
}


