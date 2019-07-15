const express=require("express")
const multer=require("multer")
const fs = require("fs")
const path =require("path")


const port=8464
const app=express()
const upload = multer({ dest: 'upload/'});

app.set("views","./views")
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine","jade")
app.listen(port)

console.log("the server has started at port "+port)

app.get('/',function(req,res){
	res.render('index',{
		info:null
	})
})

app.get('/simple',function(req,res){
	res.render('simple')
})