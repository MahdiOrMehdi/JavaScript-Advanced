export function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <h3>${product.title}</h3>
    <p>قیمت: ${product.price.toLocaleString()} تومان</p>
    <p>تعداد: ${product.qty}</p>
  `;
  return card;
}