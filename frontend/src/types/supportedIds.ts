export const supportedIds = [
    "9954277959c522d903b12624",
    "69207b922f25bf4e99fe4466",
    "6921b16ae152cd26ce89a8e3",
    "58b178959effd158c5abc2e2",
    "bba60eb303e57eb9b61fa0d1",
    "d2f57758a98c49190de32faf",
    "d937d1411d08c6164390a0b6",
    "7d6433a6d2fa7763085c3350",
];
// this bs is here due to static page exports.
// could be deleted if a static export wasn't a requirement


export function generateRandomId() {
    return "000000000000000000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

