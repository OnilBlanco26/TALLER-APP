const express = require('express')

class Server {

    constructor () {
        this.app = express()
        this.port = 3000

        this.routes()
    }

    routes() {
        this.app.use('/saludo', (req, res) => {
            res.send('hola mundo')
        })
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on the port: ${this.port}`)
        })
    }
}


module.exports = Server;