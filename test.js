// ===== Переключатель профилей =====
const buttons = document.querySelectorAll('.switcher__btn');
const profiles = document.querySelectorAll('.profile');

function activateProfile(index) {
    buttons.forEach(b => b.classList.remove('active'));
    profiles.forEach(p => p.classList.remove('active'));

    buttons[index].classList.add('active');
    document.getElementById(buttons[index].dataset.target).classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Клик мышью
buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => activateProfile(index));
});

// Клавиатура: цифры 1/2/3 и стрелки
document.addEventListener('keydown', (e) => {
    const activeIndex = [...buttons].findIndex(b => b.classList.contains('active'));

    if (e.key === '1') {
        activateProfile(0);
    } else if (e.key === '2') {
        activateProfile(1);
    } else if (e.key === '3') {
        activateProfile(2);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (activeIndex + 1) % buttons.length;
        activateProfile(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (activeIndex - 1 + buttons.length) % buttons.length;
        activateProfile(prev);
    }
});


// ===== Разворачивание секции проектов =====
const experienceBtns = document.querySelectorAll('.experience-btn');

experienceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const profile = btn.closest('.profile');
        const projectsSection = profile.querySelector('.projects-section');
        const arrow = btn.querySelector('.experience-btn__arrow');

        const isOpen = projectsSection.classList.contains('open');

        if (isOpen) {
            // Закрыть
            projectsSection.classList.remove('open');
            arrow.style.transform = 'rotate(0deg)';
            arrow.style.transition = 'transform 0.3s ease';

            setTimeout(() => {
                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            // Открыть
            projectsSection.classList.add('open');
            arrow.style.transform = 'rotate(180deg)';
            arrow.style.transition = 'transform 0.3s ease';

            // Анимация появления карточек с задержкой
            const projectCards = projectsSection.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'none';

                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 + index * 120);
            });

            setTimeout(() => {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});