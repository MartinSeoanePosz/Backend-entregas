const socket = io();
let user = "";
const getUserInput = async () => {
  const result = await Swal.fire({
    title: "Log in",
    text: "Input your email",
    input: "email",
    confirmButtonText: "Ask us!",
    allowOutsideClick: false,
    allowEscapeKey : false,
    inputValidator: (value) => {
      if (!value) {
        return "Must input an email";
      }
    },
  }).then((result) => {
    console.log("User input:", result.value);
    if (result.value) {
      user = result.value;

      socket.emit("new-user", { user: user, id: socket.id });
    }
  });
};

socket.on("new-user-connected", (data) => {
  if (data.id !== socket.id)
    Swal.fire({
      text: `${data.user} Has connected`,
      toast: true,
      position: "top-end",
    });
});

let chatBox = document.getElementById("chatBox");

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log(chatBox.value);
    socket.emit("message", {
      user,
      message: chatBox.value,
    });
    chatBox.value = "";
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let message = "";

  data.forEach((elem) => {
    message += `
        <div class="chat-message">
        <div class="message-bubble">
          <div class="message-sender" >${elem.user}</div>
          <span style="font-size: 8px">${elem.date}</span>

          <p>${elem.message}</p>
          </div>
  
        </div>
      `;
  });

  log.innerHTML = message;
});

function firstLoad() {
  fetch("/messages")
    .then((res) => res.json())
    .then((data) => {
      let log = document.getElementById("messageLogs");
      let message = "";

      data.forEach((elem) => {
        message += `
           
              <div class="chat-message">
              <div class="message-bubble">
        
                <div class="message-sender" >${elem.user}</div>
                <span>${elem.date}</span>
                <p>${elem.message}</p>
                </div>
        
              </div>
            `;
      });

      log.innerHTML = message;
    });
}
getUserInput();
// firstLoad();