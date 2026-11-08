const isApple = /Mac|iPhone|iPad/.test(navigator.userAgent);

/** "⌘K" on Apple devices, "Ctrl K" elsewhere. */
export const SEARCH_SHORTCUT = isApple ? '⌘K' : 'Ctrl K';
