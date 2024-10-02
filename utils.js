

export function generateRandNum() {
    return Math.floor(Math.random() * 100) + 1;
}

export function generateURIPath(before, uuid, after) {
    return `${before}/${uuid}/${after}`
}
export function genCoffeeUriMatcher(){
    return /coffees\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/
}

