import { coffees } from "../dto/coffees.js"; 
import CoffeeService from "../services/CoffeeService.js";

export class CoffeeController {

    constructor(){
        this.coffeeService = new CoffeeService();
    }
    
    // GET /coffees
    async getCoffees(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });    
        res.end(JSON.stringify({ data: coffees }))
    }

    // GET /coffees/:id
    async getCoffee(req, res){
        let response = {};
        let statusCode;

        let id = req.url.split("/")[2]
        const coffee = coffees.find(c => c.id === id)   
        
        if(!coffee) {
            statusCode = 204
            response = { message: "No coffee found"}
        } else {
            statusCode = 200
            response = { data: coffee }
        }

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });  
        res.end(JSON.stringify(response))
    }

    // POST /coffees
    async create(req, res) {
            let body = "";

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', async () => {

                // improve for more body validation
                if(!body) {
                    this.throwErrorResponse(res, "request-body-not-found");
                    return
                }
                   
                const createdCoffee = await this.coffeeService.create(JSON.parse(body))
                
                if(!createdCoffee) { 
                    this.throwErrorResponse(res, "failed-adding-data");
                    return
                }

                res.writeHead(201, { 'Content-Type': 'application/json' });  
                res.end(JSON.stringify(createdCoffee))
            })  
    }

    throwErrorResponse(res, msg){
        res.writeHead(400, { 'Content-Type': 'application/json' });  
        res.end(JSON.stringify({ message: msg }))
    }
}
