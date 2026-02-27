import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null); // if folder creation fails
      }
      cb(null, uploadPath); // success
    });
  },
  filename: (req, file, cb) => {
    const filename = `${new Date().getTime()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
export default upload;



// destination hoti kya hai?

// destination ek function hota hai jo Multer ko batata hai:

// “file disk pe kis folder me save karni hai”

// Signature hamesha ye hota hai:

// destination: (req, file, cb) => {}


// code ko line-by-line samjho 👇
// destination: (req, file, cb) => {


// ➡️ Multer jab file receive karta hai, ye function auto call hota hai

// req → Express request

// file → current file ka object

// cb → callback function (Multer ka)

// const uploadPath = "./uploads";
// ➡️ JS variable me folder ka path store kar liya


// fs.mkdir(uploadPath, { recursive: true }, (err) => {
// ➡️ Node.js async function call ho rahi hai
// ➡️ JS event loop yahan wait karta hai jab tak folder ban jaye

// recursive: true ka matlab:

// folder ho → kuch nahi karega

// folder na ho → bana dega

// error nahi dega

// if (err) {
//   return cb(err, null);
// }
// ➡️ Agar folder create me error aayi:

// Multer ko error de do

// Upload stop ho jata hai

// (JS me return ka matlab: yahin function khatam)

// cb(null, uploadPath);
// ➡️ Ye MOST IMPORTANT line

// JS me iska matlab:

// null → “koi error nahi”

// uploadPath → “file yahin save karo”

// ➡️ Multer internally ab:

// js
// Copy code
// file.path = "./uploads/filename.ext"

// Flow ko simple JS steps me dekho 🧠

// 1️⃣ File request se aayi
// 2️⃣ Multer ne destination() call ki
// 3️⃣ JS ne fs.mkdir() chalaya
// 4️⃣ Folder ready hua
// 5️⃣ cb(null, path) chala
// 6️⃣ File disk pe save ho gayi