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

// Pre-warm a rotating pool of Audio instances per sound so playback is
// immediate — cloneNode() does not carry buffered data and causes a
// fetch/decode stall on first play.
const POOL_SIZE = 3;

const soundPools = Object.fromEntries(
	Object.entries(SOUND_PATHS).map(([name, path]) => {
		const volume = SOUND_VOLUMES[name] ?? 0.4;
		const pool = Array.from({ length: POOL_SIZE }, () => {
			const audio = new Audio(path);
			audio.preload = 'auto';
			audio.volume = volume;
			return audio;
		});
		return [name, { pool, index: 0 }];
	})
);

function playSound(name) {
	const entry = soundPools[name];

	if (!entry) {
		return;
	}

	const audio = entry.pool[entry.index];
	entry.index = (entry.index + 1) % POOL_SIZE;
	audio.currentTime = 0;
	audio.play().catch(() => {});
}

window.playSound = playSound;
