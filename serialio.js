const net=require('net');

var HOST = '192.168.1.153';
var PORT = 8899;

const tcp_client=net.Socket();

tcp_client.connect(PORT, HOST, function() {
    console.log('tcp_client connected to: ' + HOST + ':' + PORT);
    tcp_client.write('Hello World!');
});
 
tcp_client.on('data', function(data) {
    console.log('%s',data);
    //if (data.toString().endsWith('exit')) {
   //    tcp_client.destroy();
    //}
});
 
tcp_client.on('close', function() {
    console.log('tcp_client closed');
});
 
tcp_client.on('error', function(err) {
    console.error(err);
});

module.exports.send=(msg){
	tcp_client.write(msg);
}