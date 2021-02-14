const app = require("express")();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const { file, saveAs } = require("jszip");

var zip = new JSZip();

app.use(cors());

// reading file

let data = fs.readFileSync(__dirname+"/app.js","utf-8")

console.log("data ==>",data)

console.log("path",path.basename("/"));

const directoryPath1 = path.join(__dirname+"/../emails/nodemailer");

const directoryPath = path.join(__dirname);

fs.readdir(directoryPath,(err,files)=>{
  console.log("err",err);
  console.log("files",files)

  let i = 0;

  while(i<files.length){

    console.log("${files[i]}",files[i]);
    if(files[i] != "node_modules" && files[i] != "helloworld"){

      let data1 = fs.readFileSync(__dirname+`/${files[i]}`)
      
      zip.file(`${files[i]}`, data1);
      
      if (JSZip.support.uint8array) {
        zip.generateAsync({ type: "uint8array" }).then(data => {
          console.log("data", data);
          fs.writeFile('helloworld.zip', data, function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
          });
        })
      }
    }
    i++
  }
})






app.get("/folder.zip", (req, res) => {
  fs.readFile('./helloworld.zip', (err, data) => {
    if (err) throw err;
  
    res.send(data);
  });
});

app.listen(4000, () => console.log("server is listening on port 4000"));
