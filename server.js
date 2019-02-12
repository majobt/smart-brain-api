const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs')

const register = require ('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db= knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'toby25',
        database: 'smart-brain'
    }
});

//console.log(postgres.select('*').from('users'));
/* db.select('*').from('users').then(data=>{ 
    console.log(data);
}); */

const app = express();



app.use(bodyParser.json());
app.use(cors())

//DB call
app.get('/', (req, res) => { res.send(db.users) })
//SIGNIN, test each time in postman
app.post('/signin', signin.handleSignin(db, bcrypt))
//REGISTER
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
//PROFILE
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
//IMAGE
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is runnning on port 3000');
})

//console.log(bcrypt.hashSync("sentence"))

//REGISTER
/* app.post('/register', (req, res) => {
    app.post('/register', (req, res) => { SAME
    const { email, password, name} = req.body;
    onst { email, name, password } = req.body; SAME
    const hash = bcrypt.hashSync(password);
    const hash = bcrypt.hashSync(password); SAME
    db.transaction(trx => {
    db.transaction(trx => { SAME
        trx.insert({
        trx.insert({ SAME
            hash: hash,
            hash: hash, SAME
            email: email
            email: email SAME
        })
        }) SAME
        .into('login')
        .into('login') SAME
        .returning('email')
        .returning('email') SAME
        
        .then(logInEmail => {
        .then(loginEmail => { DIFF I
            return trx('users')
            return trx('users') SAME
                .returning('*')
                .returning('*') SAME
                .insert({
                .insert({
                    name: name,
                    email: loginEmail[0], DIFF NAME FIRST
                    email: logInEmail[0],
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(rollback) !!! no trx
    })
    
    .catch(err => res.status(400).json('unable to register'))
}) */










/* const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@smith.com',
            password: 'office',
            entries: 0,
            joined: new Date()
        },
        {
            id: '456',
            name: 'Joe',
            email: 'joe@bloggs.com',
            password: 'tshirt',
            entries: 0,
            joined: new Date()
        }
    ]
} */

/* app.get('/', (req, res) => {
    res.send(database.users);
    })  */



//LIKELY ROUTES
//~ --> res = this is working
//~/signin --> POST, res success/fail (POST because info sent over https)
//~/register --> POST, res user
//~/profile/:userId --> GET = user
//~/image --> PUT -->user (count)