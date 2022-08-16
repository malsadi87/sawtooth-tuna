
const {createHash} = require('crypto')
const protobuf = require('sawtooth-sdk/protobuf')
const {
  createContext,
  Signer
} = require('sawtooth-sdk/signing')
const secp256k1 = require('sawtooth-sdk/signing/secp256k1')


const companyPREF = createHash('sha512').update("company'").digest('hex').toLowerCase().substring(0, 6)
const tripPREF = createHash('sha512').update("trip'").digest('hex').toLowerCase().substring(0, 6)

console.log("companyPREF => " , companyPREF)

console.log("tripPREF => " , tripPREF)

/*const context = createContext('secp256k1')
  const privateKey = context.newRandomPrivateKey()
  console.log("public key")
 console.log(context.getPublicKey(privateKey).asHex())
  console.log("*************************")

  console.log("private key")
  console.log(privateKey.asHex())*/
 
