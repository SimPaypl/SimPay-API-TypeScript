import { createHash } from 'node:crypto';

function sha256(text: string) {
    return hash('sha256', text);
}

function sha1(text: string) {
    return hash('sha1', text);
}

function md5(text: string) {
    return hash('md5', text);
}

function hash(algorithm: string, text: string) {
    const hash = createHash(algorithm);

    hash.update(text);

    return hash.digest('hex');
}

export { sha256, sha1, md5 };
