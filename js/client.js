const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById('send-conatiner');
const messageContainer = document.querySelector(".message-container");
var audio = new Audio('notifictaion.mp3');

const append = (message , possition)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(possition);
    messageContainer.append(messageElement);
    if(possition == 'left'){
        audio.play();
    }
}

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}` , 'right')
    socket.emit('send' , message);
    e.target.reset()
})


const name =  prompt("Enter your name joine");
socket.emit('new-user-joined', name)

socket.on('user-joined', name =>[
    append(`${name} Joine the chat` , 'right')
])

socket.on('receive', data =>[
    append(`${data.name} : ${data.message}` , 'left')

])

socket.on('left', name =>[
    append(`${name} : Left the chat` , 'left')

])

