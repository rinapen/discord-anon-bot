const CHANNEL_PREFIXES = {
    TIMELINE_ANONYMOUS: '匿名-',
    TIMELINE_NON_ANONYMOUS: '非匿名-',
};

const REGEX = {
    QUOTE: />>\d+/,
    REFERENCE: /^\^(\d+)\s+(.+)/
}

export { CHANNEL_PREFIXES, REGEX }