import { coffees } from "../dto/coffees.js"; 
import crypto from "crypto";

export default class CoffeeService{

    // implement the content conflict
    async create(coffee){
        const newCoffee = { id: crypto.randomUUID(), ...coffee }
        coffees.push(newCoffee)
        const isAddedSuccessfully = coffees.find(c => c.id === newCoffee.id)

        if(!isAddedSuccessfully) return false;
        return newCoffee;
    }
}