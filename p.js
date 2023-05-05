const express = require('express');
const fs = require('fs');
const app = express();
  
var base64str = base64_encode('divyansu.jpg');
console.log(base64str);
  
function base64_encode(file) {
    return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
}
