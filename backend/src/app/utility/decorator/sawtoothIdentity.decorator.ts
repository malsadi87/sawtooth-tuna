export const SAWTOOTH_IDENTITY_KEY = '__SAWTOOTH_IDENTITIES__';
export const SawtoothIdentity = () => {
    return function (target: Object, propertyKey: string) {
        const identities = target[SAWTOOTH_IDENTITY_KEY] || [];
        identities.push(propertyKey);

        Object.defineProperty(target, SAWTOOTH_IDENTITY_KEY, {
            value: identities
        });
    }
};