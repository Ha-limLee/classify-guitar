import express from 'express';
import path from 'path';
import multer from 'multer';
import {spawn} from 'child_process';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));  // react build directory
app.use('/uploads' ,express.static(path.join(__dirname, 'uploads')));   // images that client uploaded

const upload = multer({dest: 'uploads/', limits: {fileSize: 5 * 1024 * 1024}});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.post('/post/images', upload.array('img'), (req, res) => {
    console.log(req.files);
    /**
     * todo:
     * run.py
     * 1. classify images in /uploads using tensorflow-cpu
     * 2. print result
     * index.ts
     * 3. respond with the result
     * react
     * 4. show images by class. use <image src=''
     *      see: https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
     */
    const child = spawn('python', ['run.py', `${PORT}`]);
    child.stdout.on('data', (data) => {
        console.log(data.toString());
        res.json({ok: true});
    });
    child.stderr.on('data', (data) => {
        console.log(data.toString());
        res.json({ok: false});
    });
});

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
});