import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const publicPath = path.join(__dirname, '.', 'dist');
const port =  Number.parseInt(process.env.PORT) || 3000;
app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
    console.log('Server is up!');
});