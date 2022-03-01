const express= require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const usr = require("../database/schema")
const jwt = require("jsonwebtoken")
const {generateToken,authenticateToken} = require("../auth/jwt")

const crypto = require("crypto")
const multer = require("multer")
const path = require("path")
const {GridFsStorage} = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")


// user registration

router.post("/ur",async (req,res)=>{
    try{
        const pass = await bcrypt.hash(req.body.password, 10)
        const userss = new usr({
            _id:req.body._id,
            uuid:req.body.uuid,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:pass,
            role:req.body.role,
            status:req.body.status,
            // image:req.body.image,
            created_by:req.body.created_by,
            created_at:req.body.created_at
        })
        const data = await usr.insertMany(userss)
        console.log("user registered succesfully")
        res.send("user registered succesfully")
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})


// user login

router.post("/login",async (req,res)=>{
    try{
        const userdata = await usr.findOne({email:req.body.email})
        if(userdata){
            const compare = await bcrypt.compareSync(req.body.password,userdata.password)
            if(compare){
                const token = generateToken(req.body)
                res.send(token)
                console.log("login succesfull",token)
            }else{
                console.log("wrong password entered")
                res.send("wrong password entered")
            }
        }else{
            res.send("user not found")
            console.log("user not found")
        }
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})



// image upload

// const mongoURI = "mongodb://localhost/multer"
const mongoURI = "mongodb+srv://sampath:passwords@cluster0.w3bhu.mongodb.net/survey_app?retryWrites=true&w=majority"

const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname)
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });

// uploading images
router.post("/",upload.single("img"),(req,res)=>{
    res.json({file:req.file})
})


// getting images
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files),console.log(files)
  });
});

// get single image

router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file),console.log(file);
  });
});

// displaying image after retreiving it from database

router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// delete images by filename

router.delete('/files/:filename', (req, res) => {
  gfs.files.deleteOne({ filename: req.params.filename}, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.send("succesfully deleted")
    console.log("deleted")
  });
});

// deleting all images from database

router.delete('/files', (req, res) => {
  gfs.files.deleteMany((err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.send("succesfully deleted")
    console.log("deleted")
  });
});








module.exports = router