(function() {
    const socket = io();

    socket.emit('new-message', 'Hola, desde el frontend.');

    socket.on('mensaje_directo', (message) => {
        console.log('[mensaje_directo]', message);
    });

    socket.on('mensaje_a_todos', (message) => {
        console.log('[mensaje_a_todos]', message);
    });

    socket.on('mensaje_a_todoss', (message) => {
        console.log('[mensaje_a_todoss]', message);
    })

})();