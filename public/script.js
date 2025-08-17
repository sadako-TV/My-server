const socket = io();

// --- 사용자 이름과 방 이름 입력 (안내문구 없음) ---
let username = prompt("닉네임을 입력하세요:");
if (!username || username.trim() === "") {
  username = "익명";
}

let room = prompt("방 이름을 입력하세요:");
if (!room || room.trim() === "") {
  room = "기본방";
}

document.getElementById("room-name").innerText = `방: ${room}`;
socket.emit("joinRoom", { username, room });

// --- 메시지 전송 ---
const form = document.getElementById("chat-form");
const input = document.getElementById("msg");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    socket.emit("chatMessage", input.value);
    input.value = "";
  }
});

socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.classList.add("message");
  if (msg.username === username) {
    li.classList.add("self");
    li.innerHTML = `<strong>${msg.username}</strong><br>${msg.text}`;
  } else {
    li.classList.add("other");
    li.innerHTML = `<strong>${msg.username}</strong><br>${msg.text}`;
  }
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// --- 메모판 (자기 자신만 보임, 서버 X, 로컬만) ---
const memoInput = document.getElementById("memo-input");
const memoBtn = document.getElementById("add-memo");
const memoList = document.getElementById("memo-list");

memoBtn.addEventListener("click", () => {
  if (memoInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = memoInput.value;
    memoList.appendChild(li);
    memoInput.value = "";
  }
});
sendButton.addEventListener("click", () => {
  if (input.value.trim()) {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ":" +
                 now.getMinutes().toString().padStart(2, '0');
    socket.emit("chat message", { msg: input.value, nick, room, time });
    input.value = "";
  }
});

socket.on("chat message", ({ msg, nick, time }) => {
  const item = document.createElement("div");
  item.classList.add("message");
  item.classList.add(nick === nickname ? "self" : "other");
  item.textContent = `${nick}: ${msg}  (${time})`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
