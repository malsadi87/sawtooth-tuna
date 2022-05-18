import Dexie from "dexie";
import storageService from "../storage/storage.service";
import JWT from 'expo-jwt';
import axios from "axios";
import { APIBasePath } from "../../../constants/apiBasePaths";

const privateKey = "NTNUPAASAQUACULTURE";
const db = new Dexie("NTNUPAASAQUACULTURE");
db.version(1).stores({
    users: "++id,fullName,email,password,publicKey,privateKey"
});

const token = async (email, password) => {
    const user = await db.users.filter(x => x.email == email && x.password == password).first();
    if (user == null) throw "No such suer exist! Try registering yourself.";
    return { token: generateToken(user) };
}

const signup = async (fullName, email, password) => {
    try {
        // Try to create a key for the user
        console.info("Registration Ifo - ", fullName, email, password);
        const {data: { publicKey, privateKey }} = await axios.get(APIBasePath.Sawtooth.key.createNewPair);
        console.log(publicKey, privateKey);

        // Grab the key and save it
        // If not possible throw exception
        await db.users.add({ 
            fullName, 
            email, 
            password, 
            publicKey,
            privateKey 
        });
        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
}

const changePassword = (oldpassword, newpassword) => {
    return null;
}

const signOut = () => {
    return null;
}

const generateToken = (user) => {
    let oneYearFromNow = new Date();
    oneYearFromNow.setDate(oneYearFromNow.getDate() + 365);
    return JWT.encode({ 
        token_type: 'Bearer', 
        fullName: user.fullName,
        email: user.email,
        publicKey: user.publicKey,
        privateKey: user.privateKey
    }, privateKey, { algorithm: 'HS256', exp: oneYearFromNow });
}

const fakeAuthService = {
    token,
    signup,
    changePassword,
    signOut
}

export default fakeAuthService;