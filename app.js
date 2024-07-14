const express = require('express');
const routes = require('./mainRoutes/routes');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const admin = require('./firebase')




app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',routes)

async function start() {
    try {

        app.listen(port, () => {
            
          console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        
    }
}


start()