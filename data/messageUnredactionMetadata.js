// Optional text replacements for retroactive message-history unredaction.
// Replacements are only applied when secure_access_granted is active.
//
// Example entry:
// {
//     redacted: 'all us ███████',
//     revealed: 'all us avians'
// }
const MESSAGE_UNREDACTION_RULES = Object.freeze([
	{
		redacted: 'all us ███████',
		revealed: 'all us avians'
	},
	{
		redacted: 'give it to SUBJECT_002[NAME REDACTED]',
		revealed: 'give it to Roman'
	},
	{
		redacted: 'isn’t an ███████',
		revealed: 'isn\'t an avian'
	},
	{
		redacted: 'Director ███████',
		revealed: 'Director Salem'
	}
]);

window.MESSAGE_UNREDACTION_RULES = MESSAGE_UNREDACTION_RULES;
