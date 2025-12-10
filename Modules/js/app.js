import {createProductCard} from './products.js'
import {products, images1, images2} from './data.js'
import {toggleTheme} from './them.js'
import {createAutoSlider} from './slider.js'


const productContainer = document.getElementById('products')
products.forEach(product=> {
    const card = createProductCard(product)
    productContainer.appendChild(card)
})

createAutoSlider('slider1', images1 , 500);
createAutoSlider('slider2', images2 , 4000);

document.getElementById('themeToggle').onclick = toggleTheme