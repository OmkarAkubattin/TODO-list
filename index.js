const express = require('express');
const app = express();
let port = 8080;
const path = require('path');
const sql = require('./conn.js')
const { v4:uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const jsdom  = require('jsdom');
const { JSDOM } = jsdom;

app.use(express.urlencoded({ extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const dom = new JSDOM('index.ejs')
const document = dom.window.document;

app.get('/', async (req,res) => {
    data = await sql.conn('SELECT * FROM tasks');
    res.render('index',data);
});

app.post('/', async (req,res) => {
    let { task } = req.body;
    await sql.conn(`INSERT INTO tasks (id,name) VALUES ('${uuidv4()}','${task}')`);
    res.redirect('/');
});

app.delete('/:id/delete', async (req,res) => {
    let { id } = req.params;
    await sql.conn(`DELETE FROM tasks WHERE id='${id}'`);
    res.redirect('/');
});

app.put('/:id/:name/edit', async (req, res) => {
    let { id,name } = req.params;
    await sql.conn(`UPDATE tasks SET name = '${name}' WHERE id = '${id}'`);
    res.redirect('/');
});

app.listen(port, () =>{
    console.log(`Listening on port : ${port}`);
});
