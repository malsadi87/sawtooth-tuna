function wait(ms): Promise<void> {
    return new Promise(res => setTimeout(res, ms));
}

// function getProjectConfig(keyName: string): any {
//     return config.get(keyName);
// }

export { wait, /*getProjectConfig*/ };