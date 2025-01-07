import { createHash } from 'node:crypto';

function sha256(text: string) {
    return hash('sha256', text);
}

function hash(algorithm: string, text: string) {
    const hash = createHash(algorithm);

    hash.update(text);

    return hash.digest('hex');
}

export { sha256 };
