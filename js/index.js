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
    const phrases = [
        'Owen Wilson',
        'Graphics Programmer',
        'Video Game Developer',
        'Technical Artist'
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

function checkIfAnyProjectsOpen() {
    const details = document.querySelectorAll('.project-details');
    return Array.from(details).some(el => el.classList.contains('max-h-[2000px]'));
}

function updateScrollHintVisibility() {
    const projectDetails = document.querySelectorAll('.project-details');
    const anyOpen = Array.from(projectDetails).some(el => el.classList.contains('max-h-[5000px]'));
    const hint = document.getElementById('scroll-hint');
    if (hint) {
        hint.style.display = anyOpen ? 'none' : 'flex';
    }
}

function toggleProjectDetails(id) {
    const el = document.getElementById(id);
    if (el.classList.contains('max-h-0')) {
        el.classList.remove('max-h-0');
        el.classList.add('max-h-[5000px]');
    } else {
        el.classList.remove('max-h-[5000px]');
        el.classList.add('max-h-0');
    }
    updateScrollHintVisibility();
}

document.addEventListener('DOMContentLoaded', () => {
    updateScrollHintVisibility();
});