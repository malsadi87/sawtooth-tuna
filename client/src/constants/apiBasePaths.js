export const APIBasePath = {
    Identity: {
        base: '/identity',
        token: '/identity/token',
        signUp: '/identity/signup',
        signOut: '/identity/signOut',
        changePassword: '/identity/changePassword',
        addClaimsAndRoles: '/identity/addClaimsAndRoles',
        deleteClaimsAndRoles: '/identity/deleteClaimsAndRoles',
        deleteUsers: '/identity/delete'
    },
    Sawtooth: {
        base: '/sawtooth',
        key: {
            base: '/sawtooth/key',
            createNewPair: '/sawtooth/key/createNewPair'
        },
        metaData: {
            base: '/sawtooth/meta-data',
            getByKey: '/sawtooth/meta-data/get/:key',
            addNew: '/sawtooth/meta-data/add'
        },
        tp: {
            base: '/sawtooth/tp',
            fish: {
                base: '/sawtooth/tp/fish',
                getAll: '/sawtooth/tp/fish/',
                getById: '/sawtooth/tp/fish/getById/:id',
                createNew: '/sawtooth/tp/fish/new'
            }
        }
    }
};
