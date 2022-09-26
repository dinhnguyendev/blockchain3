const express =require('express');
const app =express();
app.use(express.static("public"));
app.set('view engine',"ejs")
app.set('views',"./views");
var mangUser=['aaa'];


app.use("/scripts",express.static(__dirname+"/node_modules/web3.js-browser/build/"));
const server =require("http").Server(app);
const io =require("socket.io")(server);
server.listen(3000)

io.on("connection",function(socket){
    console.log("con nguoi ket nois"+socket.id  );
    socket.on("disconnect",function(){
        console.log(socket.id  +"con ngat ket noi !!!");
    })
    socket.on("User-send-message",function(data){
        io.sockets.emit("User-send-message",{
            un:socket.Username,
            nd:data
        });
    })
    socket.on("toi-dang-go-chu",function(){
        const s=socket.Username;
        socket.broadcast.emit("ai-do-dang-go-chu",s)
    })
    socket.on("toi-stop-go-chu",function(){
        socket.broadcast.emit("ai-do-stop-go-chu")
    })
    socket.on("Client-send-Username",function(data){
        console.log(socket.id  +"vua gui du lieu la: "+data); 

        if(mangUser.includes(data)){
            socket.emit("server-send-dki-thatbai");
        }else{
            mangUser.push(data);
            socket.Username=data;
            socket.emit("server-send-dki-thanhcong",data);
            io.sockets.emit("Server-send-danhsach-User",mangUser);
            
        }
        //sever send data all clien
        // io.sockets.emit("Server-send-data",data+"888")



        //sever chi send client send to server
        // socket.emit("Server-send-data",data+"888")


         
        //sever send all client minus client send to server
        // socket.broadcast.emit("Server-send-data",data+"888")
        // io.to(id,data)




    })
});
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://minigame:nguyenngocdinh@cluster0.ylq6g.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true },function(err){
    if(err){
        console.log("mongodb conect error "+err)
    }else{
        console.log("mongodb conect sucess")
    }
});



require("./controllers/game")(app)



