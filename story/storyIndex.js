const STORY_CHAPTERS = Object.freeze([
    typeof CHAPTER_01 !== 'undefined' ? CHAPTER_01 : null,
    typeof CHAPTER_02 !== 'undefined' ? CHAPTER_02 : null,
    typeof CHAPTER_03 !== 'undefined' ? CHAPTER_03 : null,
    typeof CHAPTER_04 !== 'undefined' ? CHAPTER_04 : null,
    typeof CHAPTER_05 !== 'undefined' ? CHAPTER_05 : null,
    typeof CHAPTER_06 !== 'undefined' ? CHAPTER_06 : null,
    typeof CHAPTER_07 !== 'undefined' ? CHAPTER_07 : null,
    typeof CHAPTER_08 !== 'undefined' ? CHAPTER_08 : null,
    typeof CHAPTER_09 !== 'undefined' ? CHAPTER_09 : null,
    typeof CHAPTER_10 !== 'undefined' ? CHAPTER_10 : null,
    typeof CHAPTER_11 !== 'undefined' ? CHAPTER_11 : null,
    typeof CHAPTER_12 !== 'undefined' ? CHAPTER_12 : null,
    typeof CHAPTER_13 !== 'undefined' ? CHAPTER_13 : null,
    typeof CHAPTER_14 !== 'undefined' ? CHAPTER_14 : null,
    typeof CHAPTER_15 !== 'undefined' ? CHAPTER_15 : null,
    typeof CHAPTER_16 !== 'undefined' ? CHAPTER_16 : null,
    typeof CHAPTER_17 !== 'undefined' ? CHAPTER_17 : null,
    typeof CHAPTER_18 !== 'undefined' ? CHAPTER_18 : null,
    typeof CHAPTER_19 !== 'undefined' ? CHAPTER_19 : null,
    typeof CHAPTER_20 !== 'undefined' ? CHAPTER_20 : null,
    typeof CHAPTER_21 !== 'undefined' ? CHAPTER_21 : null,
    typeof CHAPTER_22 !== 'undefined' ? CHAPTER_22 : null,
    typeof CHAPTER_23 !== 'undefined' ? CHAPTER_23 : null,
    typeof CHAPTER_24 !== 'undefined' ? CHAPTER_24 : null,
    typeof CHAPTER_25 !== 'undefined' ? CHAPTER_25 : null,
    typeof CHAPTER_26 !== 'undefined' ? CHAPTER_26 : null,
    typeof CHAPTER_27 !== 'undefined' ? CHAPTER_27 : null,
    typeof CHAPTER_28 !== 'undefined' ? CHAPTER_28 : null,
    typeof CHAPTER_29 !== 'undefined' ? CHAPTER_29 : null,
    typeof CHAPTER_30 !== 'undefined' ? CHAPTER_30 : null,
    typeof CHAPTER_31 !== 'undefined' ? CHAPTER_31 : null
].filter(Boolean));


function getChapterByIndex(index) {
    return STORY_CHAPTERS[index] || null;
}

function getCurrentChapter() {
    return getChapterByIndex(getCurrentChapterIndex());
}
