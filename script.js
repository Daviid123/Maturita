document.addEventListener('DOMContentLoaded', () => {
    console.log('Fitness Hala Zlín je připravena!');
});

document.addEventListener('DOMContentLoaded', () => {
    // Najde všechny prvky s třídou "gallery-item"
    const galleryItems = document.querySelectorAll('.gallery-item');
    // Najde prvek s třídou "modal"
    const modal = document.querySelector('.modal');
    // Najde prvek s třídou "modal-content" (pro zobrazení obrázku v modálu)
    const modalImg = document.querySelector('.modal-content');
    // Najde tlačítko pro zavření modálního okna
    const closeBtn = document.querySelector('.close-modal');

    // Pro každý prvek galerie přidá událost kliknutí
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Získej zdroj obrázku (src) z aktuálního prvku
            const imgSrc = item.querySelector('img').src;
            // Nastaví zdroj obrázku v modálu
            modalImg.src = imgSrc;
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        // Pokud uživatel klikne mimo obrázek (přímo na modál), obrázek se zavře
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
