// scripts/soundManager.js
// Terminal keypress sound effects intentionally disabled.

const SOUND_PATHS = {
	boot: 'assets/sounds/boot.mp3',
	chapter_complete: 'assets/sounds/chapter_complete.wav',
	click: 'assets/sounds/click.mp3',
	error: 'assets/sounds/error.mp3',
	notification: 'assets/sounds/notification.mp3',
	open_view: 'assets/sounds/open_view.mp3'
};

const SOUND_VOLUMES = {
	boot: 0.45,
	chapter_complete: 0.5,
	click: 0.3,
	error: 0.45,
	notification: 0.4,
	open_view: 0.4
};

const soundLibrary = Object.fromEntries(
	Object.entries(SOUND_PATHS).map(([name, path]) => {
		const audio = new Audio(path);
		audio.preload = 'auto';
		audio.volume = SOUND_VOLUMES[name] ?? 0.4;
		return [name, audio];
	})
);

function playSound(name) {
	const source = soundLibrary[name];

	if (!source) {
		return;
	}

	const sound = source.cloneNode();
	sound.volume = source.volume;
	sound.play().catch(() => {});
}

window.playSound = playSound;
