export function createAutoSlider(containerId, images, interval = 3000) {
    const container = document.getElementById(containerId)

    let current = 0
    function showSlide(index) {
        container.innerHTML = ''
        const img = document.createElement('img')
        img.src = images[index]
        img.className = 'slider-image';
        container.appendChild(img)
    }

    showSlide(current)

    setInterval(() => {
    current = (current + 1) % images.length;
    showSlide(current);
  }, interval);
}