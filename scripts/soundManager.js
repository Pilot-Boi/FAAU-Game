// scripts/soundManager.js

const SOUND_FILES = {
    boot: 'assets/sounds/boot.mp3',
    typing: 'assets/sounds/typing.mp3',
    open_view: 'assets/sounds/open_view.mp3',
    notification: 'assets/sounds/notification.mp3',
    click: 'assets/sounds/click.mp3',
    error: 'assets/sounds/error.mp3',
    chapter_complete: 'assets/sounds/chapter_complete.mp3'
};

const SOUND_CACHE = {};

function loadSound(key) {
    if (!SOUND_CACHE[key]) {
        const audio = new Audio(SOUND_FILES[key]);
        audio.preload = 'auto';
        SOUND_CACHE[key] = audio;
    }
    return SOUND_CACHE[key];
}

function playSound(key, options = {}) {
    const base = loadSound(key);
    const sound = base.cloneNode(); // allows overlap

    if (options.volume !== undefined) {
        sound.volume = options.volume;
    }

    sound.play().catch(() => {});
}

window.playSound = playSound;
