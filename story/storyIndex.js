const STORY_CHAPTERS = Object.freeze([
    CHAPTER_01,
    CHAPTER_02
]);


function getChapterByIndex(index) {
    return STORY_CHAPTERS[index] || null;
}

function getCurrentChapter() {
    return getChapterByIndex(getCurrentChapterIndex());
}
