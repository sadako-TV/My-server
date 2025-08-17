const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;   // Render에서 PORT를 받아옴

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("사용자 접속됨");

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    socket.room = room;
    socket.username = username;
    console.log(`${username} 님이 ${room} 방에 입장`);
  });

  socket.on("chatMessage", (msg) => {
    io.to(socket.room).emit("message", {
      username: socket.username,
      text: msg,
    });
  });

  socket.on("disconnect", () => {
    console.log("사용자 연결 해제");
  });
});

http.listen(PORT, '0.0.0.0', () => {   // ✅ 포트 고정 안 하고 Render 지정 값 사용
  console.log(`서버 실행 중 → ${PORT}`);
});
