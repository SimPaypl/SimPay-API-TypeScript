import { createHash } from "crypto"

export class Hashing {
    public static sha256(text :string) {
        return Hashing.hash('sha256', text);
    }

    public static sha1(text :string) {
        return Hashing.hash('sha1', text);
    }

    public static md5(text :string) {
        return Hashing.hash('md5', text);
    }

    private static hash(algorithm :string, text :string) {
        const hash = createHash(algorithm);

        hash.update(text);

        return hash.digest('hex').toUpperCase();
    }
}
