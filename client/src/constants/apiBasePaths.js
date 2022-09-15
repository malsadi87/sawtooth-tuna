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
            product: {
                base: '/sawtooth/tp/product',
                getAll: '/sawtooth/tp/product/',
                getById: '/sawtooth/tp/product/getById/:id',
                createNew: '/sawtooth/tp/product/addNew'
            }
        }
    }
};
