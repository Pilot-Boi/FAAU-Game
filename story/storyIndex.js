const STORY_CHAPTERS = Object.freeze([
    CHAPTER_01,
    CHAPTER_02,
    CHAPTER_03,
    CHAPTER_04,
    CHAPTER_05,
    CHAPTER_06,
    CHAPTER_07,
    CHAPTER_08,
    CHAPTER_09,
    CHAPTER_10,
    CHAPTER_11,
    CHAPTER_12,
    CHAPTER_13,
    CHAPTER_14,
    CHAPTER_15,
    CHAPTER_16,
    CHAPTER_17,
    CHAPTER_18,
    CHAPTER_19,
    CHAPTER_20,
    CHAPTER_21,
    CHAPTER_22,
    CHAPTER_23,
    CHAPTER_24,
    CHAPTER_25,
    CHAPTER_26,
    CHAPTER_27,
    CHAPTER_28,
    CHAPTER_29,
    CHAPTER_30,
    CHAPTER_31
]);


function getChapterByIndex(index) {
    return STORY_CHAPTERS[index] || null;
}

function getCurrentChapter() {
    return getChapterByIndex(getCurrentChapterIndex());
}
