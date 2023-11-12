(function() {
    const socket = io();
    let messages = [];
    // from-message
    const formMessage = document.getElementById('form-message');
    // input-message
    const inputMessage = document.getElementById('input-message');
    // show-message
    const showMessage = document.getElementById('show-message');

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        messages.push({
            socketId: socket.id,
            body: inputMessage.value,
        });
        socket.emit('new-message', inputMessage.value);
        inputMessage.value = '';
        inputMessage.focus();
        updateMessage(messages);
    });

    function updateMessage(messages) {
        showMessage.innerText = '';
        messages.forEach((message) => {
            const item = document.createElement('li');
            item.innerText = `(${message.socketId}) - ${message.body}`;
            showMessage.appendChild(item);
        });
    };

    socket.on('notification', (message) => {
        messages.push(message);
        updateMessage(messages);
    });

})();