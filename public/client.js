// public/client.js

const socket = io();

// --- 사용자 이름과 방 이름 입력 ---
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

// --- 서버에서 오는 메시지 표시 ---
socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.classList.add("message");

  if (msg.username === username) {
    li.classList.add("self");
  } else {
    li.classList.add("other");
  }

  li.innerHTML = `<strong>${msg.username}</strong><br>${msg.text}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// --- 메모판 (로컬에서만 작동, 서버와 무관) ---
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
