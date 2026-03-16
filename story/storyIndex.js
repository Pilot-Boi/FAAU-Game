const STORY_CHAPTERS = Object.freeze(
    Array.from({ length: 31 }, (_, index) => {
        const chapterNumber = String(index + 1).padStart(2, '0');
        return globalThis[`CHAPTER_${chapterNumber}`] || null;
    }).filter(Boolean)
);


function getChapterByIndex(index) {
    return STORY_CHAPTERS[index] || null;
}

function getCurrentChapter() {
    return getChapterByIndex(getCurrentChapterIndex());
}
