function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('nav').classList.toggle('dark:bg-gray-900');
    document.querySelector('nav').classList.toggle('bg-gray-200');
    document.querySelector('footer').classList.toggle('dark:bg-gray-900');
    document.querySelector('footer').classList.toggle('bg-gray-200');

    document.querySelectorAll('.project-box').forEach(element => {
        element.classList.toggle('dark:bg-gray-700');
        element.classList.toggle('bg-gray-200');
    });

    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        document.querySelector('nav').classList.add('dark:bg-gray-900');
        document.querySelector('footer').classList.add('dark:bg-gray-900');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let enlargedBox = null;
    const projectContainer = document.getElementById('project-container');
    const projectRow = document.getElementById('project-row');
    const projectBoxes = document.querySelectorAll('.project-box');

    projectBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const description = box.querySelector('.project-description');

            if (enlargedBox && enlargedBox !== box) {
                const prevDescription = enlargedBox.querySelector('.project-description');
                prevDescription.classList.add('hidden');
                enlargedBox.classList.remove('enlarged');
                projectRow.appendChild(enlargedBox);
            }

            if (enlargedBox === box) {
                box.classList.remove('enlarged');
                description.classList.add('hidden');
                projectRow.appendChild(box);
                enlargedBox = null;
            } else {
                box.classList.add('enlarged');
                description.classList.remove('hidden');
                projectContainer.insertBefore(box, projectRow);
                enlargedBox = box;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Owen Wilson',
        'Fullstack Developer',
        'Video Game Creator',
        'Tailwind Designer',
        'Deep Learning Enthusiast'
    ];
    const typingText = document.getElementById('typing-text');
    const highlight = document.getElementById('highlight');

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;
    let deletingSpeed = 100;
    let pauseDuration = 50;

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        const baseText = currentPhraseIndex === 0 ? "I am " : "I am a ";
        
        let displayText = baseText + `<span class="typing-highlight">${currentPhrase.substring(0, currentCharIndex)}</span>`;

        if (isDeleting) {
            currentCharIndex--;

            if (currentCharIndex < 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                setTimeout(type, pauseDuration);
                return;
            }
        } else {
            currentCharIndex++;

            if (currentCharIndex > currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, pauseDuration);
                return;
            }
        }

        typingText.innerHTML = displayText;
        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    type();
});