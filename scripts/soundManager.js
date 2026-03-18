// scripts/soundManager.js

const SOUND_PATHS = {
    typingLoop: 'assets/sounds/typing.mp3',        // looping typing ambience
    specialKey: 'assets/sounds/special_key.mp3'    // space / enter / backspace
};

const typingLoopAudio = new Audio(SOUND_PATHS.typingLoop);
typingLoopAudio.preload = 'auto';
typingLoopAudio.loop = true;
typingLoopAudio.volume = 0.55;

const specialKeyAudio = new Audio(SOUND_PATHS.specialKey);
specialKeyAudio.preload = 'auto';
specialKeyAudio.volume = 0.25;

let typingStopTimer = null;
let typingActive = false;

// Starts the looping typing sound if it is not already playing.
function startTypingLoop() {
    if (typingStopTimer) {
        clearTimeout(typingStopTimer);
        typingStopTimer = null;
    }

    if (typingActive) {
        return;
    }

    typingActive = true;
    typingLoopAudio.currentTime = 0;
    typingLoopAudio.play().catch(() => {});
}

// Schedules the typing loop to stop after a short idle gap.
function scheduleTypingLoopStop(idleMs = 180) {
    if (typingStopTimer) {
        clearTimeout(typingStopTimer);
    }

    typingStopTimer = setTimeout(() => {
        stopTypingLoop();
    }, idleMs);
}

// Stops the looping typing sound immediately.
function stopTypingLoop() {
    if (typingStopTimer) {
        clearTimeout(typingStopTimer);
        typingStopTimer = null;
    }

    typingActive = false;
    typingLoopAudio.pause();
    typingLoopAudio.currentTime = 0;
}

// Plays the special key sound once.
function playSpecialKeySound() {
    const sound = specialKeyAudio.cloneNode();
    sound.volume = specialKeyAudio.volume;
    sound.play().catch(() => {});
}

// Call this for normal printable typing keys.
function handleTypingKey() {
    startTypingLoop();
    scheduleTypingLoopStop();
}

// Call this for space / enter / backspace.
function handleSpecialKey() {
    playSpecialKeySound();
    stopTypingLoop();
}

window.startTypingLoop = startTypingLoop;
window.scheduleTypingLoopStop = scheduleTypingLoopStop;
window.stopTypingLoop = stopTypingLoop;
window.playSpecialKeySound = playSpecialKeySound;
window.handleTypingKey = handleTypingKey;
window.handleSpecialKey = handleSpecialKey;
