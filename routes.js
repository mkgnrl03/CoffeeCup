 import { createServer } from "node:http";
import { logger } from "./middleware/Logger.js"
import { CoffeeController } from "./src/controllers/CoffeeController.js";
import { genCoffeeUriMatcher } from "./utils.js"

const port = process.env.PORT
const hostname = process.env.HOSTNAME

const server = createServer( (req, res) => {
    logger(req, res, async () => {

        // GET  /coffees
        if(req.url === "/coffees" && req.method === "GET")  
            await new CoffeeController().getCoffees(req, res);

        // GET  /coffees/:id
        if(req.url.match(genCoffeeUriMatcher()))
            await new CoffeeController().getCoffee(req, res);

        // POST /coffees
        if(req.url === "/coffees" && req.method === "POST")
            await new CoffeeController().create(req, res);
    })
});

server.listen(port, hostname, () => {
    console.log("Server running at localhost:"+port);
});



