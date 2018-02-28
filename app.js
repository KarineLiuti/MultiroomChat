var app = require('./config/server');

var server = app.listen(800, function(){
  console.log('Servidor online');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
  console.log('Usuário conectou');

  socket.on('disconnect', function(){
    console.log('Usuário desconectou');
  });

  socket.on('msgParaServidor', function(data){
    /* Mensagem */
    socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
    socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});

    /* Participantes */
    if(parseInt(data.apelido_atualizado_nos_clientes)  == 0 ){
      socket.emit('participantesParaCliente', {apelido: data.apelido});
      socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
    }
  })
});