export const SawtoothIdentity = () => {
    return function (target: Object, propertyKey: string) {
        const identities = target['identities'] || [];
        identities.push(propertyKey);

        Object.defineProperty(target, 'identities', {
            value: identities
        });
    }
};