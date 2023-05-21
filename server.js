const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }))
app.use(cookieParser())

const USER = new Map();
USER.set('admin', { id: 1, username: 'admin', role: 'Admin' })
USER.set('account', { id: 1, username: 'account', role: 'Account' })

const SESSION = new Map()

app.post("/login", (req, res) => {
    const user = USER.get(req.body.username)

    if (user === null) {
        res.sendStatus(401);
        return;
    }

    const sessionId = crypto.randomUUID()
    SESSION.set(sessionId, user)
    console.log('Session', SESSION)

    res.cookie("sessionId", sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 20000
    }).send(`Authenticate user ${req.body.username}`)
});

app.get("/data", (req, res) => {
    console.log('sessionId', req.cookies.sessionId)
    if (req.cookies.sessionId) {
        const user = SESSION.get(req.cookies.sessionId)

        if (!user) {
            res.status(401).send('User not found error');
            return;
        }

        if (user.role !== 'Admin') {
            res.send('This is normal user data');
            return;
        }
        res.send(`This is admin data`)
    } else {
        res.send(`Unauthenticated`)
    }
});

app.listen(3000)