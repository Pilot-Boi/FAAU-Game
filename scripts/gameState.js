/**
 * This file defines the GAME_STATE object and related functions to manage the player's progress, discovered terms, unlocked commands, and triggered events in the narrative terminal game. It provides a centralized way to track what the player has done and what they have access to as they explore the game's virtual file system and uncover its story.
 * The GAME_STATE object includes:
 * - filesRead: A set of file paths that the player has read.
 * - discoveredTerms: A set of terms that the player has discovered through reading files or triggering events.
 * - flags: An object to store various boolean flags that represent the player's progress and choices.
 * - unlockedCommands: A set of command names that the player has unlocked and can use in the terminal.
 * - triggeredEvents: A set of event names that have been triggered by the player's actions.
 * 
 * The functions provided allow for checking and updating these states, such as marking files as read, adding 
 * discovered terms, unlocking commands, and managing flags and events. This structure helps to create a dynamic and responsive game experience based on the player's interactions with the terminal.
 */

const GAME_STATE = {
    filesRead: new Set(),
    discoveredTerms: new Set(),
    searchedTerms: new Set(),
    flags: {},
    unlockedCommands: new Set([
        'help',
        'list',
        'move',
        'open',
        'search',
        'terms',
        'flags',
        'clear',
        'dev'
    ]),
    triggeredEvents: new Set(),
    storyState: {
        currentChapter: 0,
        chapterPlayed: new Set(),
        readEntryKeys: new Set(),
        contactMessageHistory: {}
    }
};


function normalizeTerm(term) {
    return term.trim().toLowerCase();
}

function hasFlag(flagName) {
    return Boolean(GAME_STATE.flags[flagName]);
}

function setFlag(flagName, value = true) {
    GAME_STATE.flags[flagName] = value;
}

function clearFlag(flagName) {
    delete GAME_STATE.flags[flagName];
}

function hasTriggeredEvent(eventName) {
    return GAME_STATE.triggeredEvents.has(eventName);
}

function triggerEvent(eventName) {
    GAME_STATE.triggeredEvents.add(eventName);
}

function clearTriggeredEvent(eventName) {
    GAME_STATE.triggeredEvents.delete(eventName);
}

function markFileRead(path) {
    GAME_STATE.filesRead.add(path);
}

function hasReadFile(path) {
    return GAME_STATE.filesRead.has(path);
}

function addDiscoveredTerms(terms = []) {
    for (const term of terms) {
        GAME_STATE.discoveredTerms.add(normalizeTerm(term));
    }
}

function removeDiscoveredTerm(term) {
    if (!term) {
        return;
    }

    const normalized = normalizeTerm(term);
    GAME_STATE.discoveredTerms.delete(normalized);
    GAME_STATE.searchedTerms.delete(normalized);
}

function hasDiscoveredTerm(term) {
    return GAME_STATE.discoveredTerms.has(normalizeTerm(term));
}

function getDiscoveredTerms() {
    return Array.from(GAME_STATE.discoveredTerms).sort();
}

function markTermSearched(term) {
    if (!term) {
        return;
    }

    GAME_STATE.searchedTerms.add(normalizeTerm(term));
}

function hasSearchedTerm(term) {
    return GAME_STATE.searchedTerms.has(normalizeTerm(term));
}

function getSearchedTerms() {
    return Array.from(GAME_STATE.searchedTerms).sort();
}

function unlockCommand(commandName) {
    GAME_STATE.unlockedCommands.add(commandName);
}

function lockCommand(commandName) {
    GAME_STATE.unlockedCommands.delete(commandName);
}

function isCommandUnlocked(commandName) {
    return GAME_STATE.unlockedCommands.has(commandName);
}

function getCurrentChapterIndex() {
    return GAME_STATE.storyState.currentChapter;
}

function setCurrentChapterIndex(index) {
    GAME_STATE.storyState.currentChapter = index;
}

function markChapterPlayed(chapterId) {
    GAME_STATE.storyState.chapterPlayed.add(chapterId);
}

function hasPlayedChapter(chapterId) {
    return GAME_STATE.storyState.chapterPlayed.has(chapterId);
}

function markStoryEntryRead(entryKey) {
    GAME_STATE.storyState.readEntryKeys.add(entryKey);
}

function hasStoryEntryRead(entryKey) {
    return GAME_STATE.storyState.readEntryKeys.has(entryKey);
}

function appendContactMessageHistory(contactId, conversationItems = []) {
    if (!contactId || !Array.isArray(conversationItems) || conversationItems.length === 0) {
        return;
    }

    if (!GAME_STATE.storyState.contactMessageHistory[contactId]) {
        GAME_STATE.storyState.contactMessageHistory[contactId] = [];
    }

    GAME_STATE.storyState.contactMessageHistory[contactId].push(...conversationItems);
}

function getContactMessageHistory(contactId) {
    if (!contactId || !Array.isArray(GAME_STATE.storyState.contactMessageHistory[contactId])) {
        return [];
    }

    return [...GAME_STATE.storyState.contactMessageHistory[contactId]];
}


function getGameState() {
    return GAME_STATE;
}


function resetGameState() {
    GAME_STATE.filesRead.clear();
    GAME_STATE.discoveredTerms.clear();
    GAME_STATE.searchedTerms.clear();
    GAME_STATE.flags = {};

    GAME_STATE.unlockedCommands = new Set([
        'help',
        'list',
        'move',
        'open',
        'search',
        'terms',
        'flags',
        'clear',
        'dev'
    ]);

    GAME_STATE.triggeredEvents.clear();

    GAME_STATE.storyState.currentChapter = 0;
    GAME_STATE.storyState.chapterPlayed.clear();
    GAME_STATE.storyState.readEntryKeys.clear();
    GAME_STATE.storyState.contactMessageHistory = {};
}
