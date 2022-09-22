const ENTER_KEYCODE = 13;
const messageList = [];
const chatFeed = document.querySelector(".chat__feed");
const messageInput = document.getElementById("message-input");
const sendButton = document.querySelector(".chat__message__send");

const myMessageTemp = document.querySelector("#my-message-temp");

messageInput.addEventListener("keypress", function (event) {
  if (!event.shiftKey && event.keyCode === ENTER_KEYCODE) {
    sendMessage();
    event.preventDefault();
  }
});

sendButton.addEventListener("click", sendMessage);
sendButton.addEventListener("keypress", function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    sendMessage();
    event.preventDefault();
  }
});

function sendMessage() {
  if (messageInput.textContent === "") {
    return;
  }

  const createdAt = new Date();

  messageList.push({
    text: messageInput.textContent,
    timeDate: formatDate(createdAt),
    createdAt,
  });
  if (messageList[messageInput.leng])
    // Todo send message
    genMessage(messageInput.textContent);

  messageInput.innerHTML = "";
}

function genMessage(text) {
  const myMessage = myMessageTemp.content.cloneNode(true);
  const textEl = myMessage.querySelector("[el-text]");
  const timeEl = myMessage.querySelector("[el-time]");
  textEl.textContent = text;
  timeEl.textContent = formatDate(new Date());
  chatFeed.append(myMessage);
}

function formatDate(date) {
  return `${date.getDate()}/${(date.getMonth() + 1)
    .toString()
    .padStart(
      2,
      "0"
    )}/${date.getFullYear()} ${date.getMonth()}/${date.getMinutes()}`;
}
