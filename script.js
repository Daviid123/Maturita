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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const trainerCards = document.querySelectorAll('.trainer-card');
    let currentStep = 1;

    // Funkce pro přepínání kroků
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
            if (step.dataset.step == stepNumber) {
                step.classList.add('active');
            }
        });

        // Aktualizace progress baru
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            if (stepNum === stepNumber) {
                step.classList.add('active');
            } else if (stepNum < stepNumber) {
                step.classList.add('completed');
            }
        });
    }

    // Validace jednotlivých kroků
    function validateStep(stepNumber) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling;
            if (!input.value) {
                isValid = false;
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });

        if (stepNumber === 2) {
            const selectedTrainer = document.querySelector('.trainer-card.selected');
            const errorMessage = document.querySelector('.trainer-options + .error-message');
            if (!selectedTrainer) {
                isValid = false;
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        }

        return isValid;
    }

    // Event listeners pro tlačítka Další
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Event listeners pro tlačítka Zpět
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Event listeners pro výběr trenéra
    trainerCards.forEach(card => {
        card.addEventListener('click', () => {
            trainerCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            document.querySelector('.trainer-options + .error-message').style.display = 'none';
        });
    });

    // Odeslání formuláře
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Požadavek na server
            form.style.display = 'none';
            document.querySelector('.progress-bar').style.display = 'none';
            document.querySelector('.success-message').style.display = 'block';
        }
    });

    // Nastavení minimálního data na dnešek
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
});
