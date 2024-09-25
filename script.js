function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('navbar-scroll');
    } else {
        header.classList.remove('navbar-scroll');
    }
});
