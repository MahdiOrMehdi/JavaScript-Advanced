// class Product {
//     constructor(name, price) {
//         this.name = name
//         this.price = price
//     }

//     display(){
//         return `Products name: ${this.name} | Products price: ${this.price}`
//     }
// }

// const p1 = new Product('labtab', 50000000)
// const p2 = new Product('phone', 20000000)
// const p3 = new Product('hedphone', 3000000)


// const products = [p1, p2, p3]



// function increasePrice(product, precent) {
//     let newPrice = product.price + product.price * (precent / 100)
//     return new Product(product.name, newPrice)
// }

// function mapProducts(products, fn) {
//     return products.map(fn)
// }

// function fillterExpensive(products, minPrice) {
//     return products.filter(p => p.price > minPrice)
// }

// function totalPrice(products) {
//     return products.reduce((sum, p)=> sum + p.price, 0)
// }



// const increasedPrice = mapProducts(products, p => increasePrice(p, 10))

// const expensiveProducts = fillterExpensive(increasedPrice, 20000000)

// const sumExpensive = totalPrice(expensiveProducts)





class Product {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    display(){
        return `Products name: ${this.name} | Products price: ${this.price}`
    }
}

const p1 = new Product('labtab', 50000000)
const p2 = new Product('phone', 20000000)
const p3 = new Product('hedphone', 3000000)


const products = [p1, p2, p3]



function increasePrice(product, precent) {
    let newPrice = product.price - product.price * (precent / 100)
    return new Product(product.name, newPrice)
}

function mapProducts(products, fn) {
    return products.map(fn)
}

function fillterExpensive(products, minPrice) {
    return products.filter(p => p.price < minPrice)
}

function totalPrice(products) {
    return products.reduce((sum, p)=> sum + p.price, 0)
}



const increasedPrice = mapProducts(products, p => increasePrice(p, 15))

const cheapProducts = fillterExpensive(increasedPrice, 10000000)

const sumExpensive = totalPrice(cheapProducts)


console.log('محصولات اولیه:');
products.forEach(p => console.log(p.display()));

console.log('\nمحصولات با کاهش قیمت:');
increasedPrice.forEach(p => console.log(p.display()));

console.log('\nمحصولات ارزان تر از 10 میلیون:');
cheapProducts.forEach(p => console.log(p.display()));

console.log(`\nجمع قیمت محصولات ارزان تر از 10 میلیون: ${sumExpensive} تومان`);