const express = require('express')
const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = 3010

app.get('/', (req, res) => {
    res.send('Send messages server started!')
})

app.post('/send-message', async function (req, res) {

    const {name, email, message} = req.body

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mssg.from.portfolio@gmail.com",
            pass: "apan872375",
        },
    });

    let info = await transporter.sendMail({
        from: "from-portfolio",
        to: "evapanasevich@yandex.ru",
        subject: "message from portfolio",
        html: `<b>Message from your portfolio:</b>
            <div>
            name: ${name}
            </div>
            <div>
            contact: ${email}
            </div>
            <div>
            ${message}
            </div>`,
    });
    res.send('ok!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})