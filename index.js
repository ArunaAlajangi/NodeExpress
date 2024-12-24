const express = require('express');
const app = express();
const data = require('./coursedata.json');
const fs = require('fs');
const port=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello module end');
});

app.get('/getdata', (req, res) => {
    res.send(data);
});

app.post('/contact', (req, res) => {
    const body = req.body;
    data.push({ ...body, id: data.length + 1 });

    fs.writeFile('./coursedata.json', JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send(data);
    });
});

app.patch('/update/:id', (req, res) => {
    const identitynumber = Number(req.params.id);
    const update = data.find((item) => item.id === identitynumber);
    if (!update) {
        return res.status(404).send('Record not found');
    }
    update.first_name = 'Aruna';

    fs.writeFile('./coursedata.json', JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send(data);
    });
});

app.delete('/del/:id', (req, res) => {
    const identitynumber = Number(req.params.id);
    const index = data.findIndex((item) => item.id === identitynumber);
    if (index === -1) {
        return res.status(404).send('Record not found');
    }
    data.splice(index, 1);

    fs.writeFile('./coursedata.json', JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.json({ status: 'successfully deleted', data });
    });
});

app.listen(port, () => {
    console.log('server started');
});
