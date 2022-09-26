const socket=io("http://localhost:3000");
socket.on("server-send-dki-thatbai",function(){
    alert("sai Username ...co nguoi dang ky")
})
socket.on("server-send-dki-thanhcong",function(data){
   $("#currentUser").html(data)
})
socket.on("Server-send-danhsach-User",function(data){
    $("#boxContent").html("")
    data.forEach(element => {
        $("#boxContent").append("<div>"+element+"</div>")
    });
})
socket.on("ai-do-dang-go-chu",function(data){
   $("#thongbao").html(data+ "dang soan tin nhan")
})
socket.on("ai-do-stop-go-chu",function(){
   $("#thongbao").html("")
})
socket.on("User-send-message",function(data){
   $("#listMessages").append("<div>"+data.un+" : </div>"+"<div>"+data.nd+"</div>")
})
$(document).ready(function(){
    $("#btnRegister").click(function(){
      socket.emit("Client-send-Username",$("#txtUsername").val())
    });
    $("#btnSendMessage").click(function(){
      socket.emit("User-send-message",$("#txtMessege").val())
    });
    $("#txtMessege").focusin(function(){
      socket.emit("toi-dang-go-chu")
    });
    $("#txtMessege").focusout(function(){
      socket.emit("toi-stop-go-chu")
    });
})