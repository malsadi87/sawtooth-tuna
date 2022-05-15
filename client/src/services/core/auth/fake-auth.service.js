import Dexie from "dexie";
import storageService from "../storage/storage.service";
import JWT from 'expo-jwt';

const privateKey = "NTNUPAASAQUACULTURE";
const db = new Dexie("NTNUPAASAQUACULTURE");
db.version(1).stores({
    users: "++id,fullName,email,password,sTPublicKey"
});

const token = async (email, password) => {
    const user = await db.users.filter(x => x.email == email && x.password == password).first();
    if (user == null) throw "No such suer exist! Try registering yourself.";
    return { token: generateToken(user) };
}

const signup = async (fullName, email, password) => {
    // Try to create a key for the user
    // Grab the key and save it
    // If not possible throw exception
    await db.users.add({fullName, email, password});
    return true;
}

const changePassword = (oldpassword, newpassword) => {
    return null;
}

const signOut = () => {
    return null;
}

const generateToken = (user) => {
    let now = new Date();
    now.setDate(now.getDate() + 365);
    return JWT.encode({ 
        token_type: 'Bearer', 
        fullName: user.fullName,
        email: user.email,
        sTPublicKey: user.sTPublicKey
    }, privateKey, { algorithm: 'HS256', exp: now });
}

const fakeAuthService = {
    token,
    signup,
    changePassword,
    signOut
}

export default fakeAuthService;