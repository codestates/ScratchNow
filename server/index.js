const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('되는건가요?');
});

app.listen(port, () => {
    console.log('되고있어요!');
})