"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToPascal = exports.toPascal = exports.objectToSnake = exports.toSnake = exports.objectToCamel = exports.toCamel = void 0;
function convertObject(obj, keyConverter) {
    if (obj === null || typeof obj === 'undefined' || typeof obj !== 'object') {
        return obj;
    }
    const out = (Array.isArray(obj) ? [] : {});
    for (const [k, v] of Object.entries(obj)) {
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        out[keyConverter(k)] = Array.isArray(v)
            ? v.map((item) => typeof item === 'object' && !Buffer.isBuffer(item)
                ? convertObject(item, keyConverter)
                : item)
            : Buffer.isBuffer(v)
                ? v
                : typeof v === 'object'
                    ? convertObject(v, keyConverter)
                    : v;
    }
    return out;
}
function toCamel(term) {
    return (term.length === 1
        ? term.toLowerCase()
        : term.replace(/^([A-Z])/, (m) => m[0].toLowerCase()).replace(/[_-]([a-z0-9])/g, (m) => m[1].toUpperCase()));
}
exports.toCamel = toCamel;
function objectToCamel(obj) {
    return convertObject(obj, toCamel);
}
exports.objectToCamel = objectToCamel;
function toSnake(term) {
    let result = term;
    let circuitBreaker = 0;
    while ((/([a-z])([0-9])/.exec(result)?.length || 0) > 2 && circuitBreaker < 10) {
        result = result.replace(/([a-z])([0-9])/, (_all, $1, $2) => `${$1.toLowerCase()}_${$2.toLowerCase()}`);
        circuitBreaker += 1;
    }
    while ((/(.+?)([A-Z])/.exec(result)?.length || 0) > 2 && circuitBreaker < 10) {
        result = result.replace(/(.+?)([A-Z])/, (_all, $1, $2) => `${$1.toLowerCase()}_${$2.toLowerCase()}`);
        circuitBreaker += 1;
    }
    return result.toLowerCase();
}
exports.toSnake = toSnake;
function objectToSnake(obj) {
    return convertObject(obj, toSnake);
}
exports.objectToSnake = objectToSnake;
function toPascal(term) {
    return toCamel(term).replace(/^([a-z])/, (m) => m[0].toUpperCase());
}
exports.toPascal = toPascal;
function objectToPascal(obj) {
    return convertObject(obj, toPascal);
}
exports.objectToPascal = objectToPascal;
