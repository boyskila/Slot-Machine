import io from 'socket.io-client'
 $(document).ready(function(){
    const PORT = 'http://localhost:4000';
    var socket = io.connect(PORT);
console.log(io)
    $('button').click(function(){
        socket.emit('send speed', $('#txt').val())
    })

    $("#txt").keyup(function(event) {
        if (event.keyCode === 13) {
            $('button').trigger('click');
        }
    })
})