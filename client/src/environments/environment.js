import { environment as prodenvironment } from "./environment.prod"

export var environment = {
    production: false,
    endPointUrl: 'http://localhost:3001/api/v1',
    cacheTimeInMinute: 1,
    fakeBackEnd: false,
    enableAuth: true
}

if (process?.env?.NODE_ENV == 'production') {
    console.log('Production environment found');
    environment = prodenvironment;
}
