function setTheme(mode) {
    document.body.setAttribute('data-theme', mode)
}

export function toggleTheme() {
    const curent = document.body.getAttribute('data-theme')
    const newTheme = curent === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
}