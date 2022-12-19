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
                getById: '/sawtooth/tp/product/:id',
                createNew: '/sawtooth/tp/product/addNew',
                getByPalletId: '/sawtooth/tp/product/palletId/:palletId'
            },
            trip: {
                base: '/sawtooth/tp/trip',
                getAll: '/sawtooth/tp/trip/',
                getById: '/sawtooth/tp/trip/:id',
                createNew: '/sawtooth/tp/trip/addNew'
            },
            haul: {
                base: '/sawtooth/tp/haul',
                getAll: '/sawtooth/tp/haul/',
                getById: '/sawtooth/tp/haul/:id',
                getByPkTrip: '/sawtooth/tp/haul/trip/:pkTrip',
                createNew: '/sawtooth/tp/haul/addNew'
            },
            pallet: {
                base: '/sawtooth/tp/pallet',
                getAll: '/sawtooth/tp/pallet/',
                getById: '/sawtooth/tp/pallet/:id',
                createNew: '/sawtooth/tp/pallet/addNew'
            },
            palletEvent: {
                base: '/sawtooth/tp/pallet-event',
                getAll: '/sawtooth/tp/pallet-event/',
                getById: '/sawtooth/tp/pallet-event/:id',
                createNew: '/sawtooth/tp/pallet-event/addNew'
            },
            species: {
                base: '/sawtooth/tp/species',
                getAll: '/sawtooth/tp/species/',
                getById: '/sawtooth/tp/species/:id',
                createNew: '/sawtooth/tp/species/addNew'
            },
            consumerPackage: {
                base: '/sawtooth/tp/custom-package',
                getAll: '/sawtooth/tp/custom-package/',
                getById: '/sawtooth/tp/custom-package/:id',
                getData: '/sawtooth/tp/custom-package/getData/:id',
                createNew: '/sawtooth/tp/custom-package/addNew'
            },
            company: {
                base: '/sawtooth/tp/company',
                getAll: '/sawtooth/tp/company/',
                getById: '/sawtooth/tp/company/:id',
                createNew: '/sawtooth/tp/company/addNew'
            },
            catch: {
                base: '/sawtooth/tp/catch',
                getAll: '/sawtooth/tp/catch/',
                getById: '/sawtooth/tp/catch/:id',
                createNew: '/sawtooth/tp/catch/addNew'
            },
        }
    }
};
