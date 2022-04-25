import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// react build directory
app.use(express.static(path.join(__dirname, 'client/build')));
// model topology(.json) and sharded weights(.bin)
// see: https://www.tensorflow.org/js/tutorials/conversion/import_keras
app.use(express.static(path.join(__dirname, 'tfjs_model')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.get('/get/model', (req, res) => {
    res.sendFile(path.join(__dirname, 'tfjs_model/model.json'));
});

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
});