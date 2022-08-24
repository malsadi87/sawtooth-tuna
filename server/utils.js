// SPDX-License-Identifier: Apache-2.0

/*
This code is developed by Mohammed Alsadi
 */

const { createHash } = require('crypto')
const protobuf = require('sawtooth-sdk/protobuf')
const {
  createContext,
  Signer
} = require('sawtooth-sdk/signing')
const secp256k1 = require('sawtooth-sdk/signing/secp256k1')
const axios = require('axios')
const atob = require('atob')
const crypto = require('crypto')

// Config variables
const API_URL = 'http://rest-api:8008'

const transactions=[
    {family:"company",version:"0.1", prefix:"45235d"},
    {family:"haul",version:"0.1", prefix:"00a404"},
    {family:"pallet",version:"0.1", prefix:"02cd1c"},
    {family:"pallet-event",version:"0.1", prefix:"6b6112"},
    {family:"custom-package",version:"0.1", prefix:"20e9e3"},
    {family:"product",version:"0.1", prefix:"5a5650"},
    {family:"species",version:"0.1", prefix:"274c22"},
    {family:"trip",version:"0.1", prefix:"db25c6"},
    {family:"catch-package",version:"0.1", prefix:"7a21ab"},
]

const getTransactionDetails = (name) => {
    let result = transactions.find(transaction => transaction.family === name)
    return result
}

const _hash = (x) =>
  crypto.createHash('sha512').update(x).digest('hex').toLowerCase()


const get_address = (name, key) => {
  const namespace = _hash(name).substring(0, 6)
  return namespace + "00" + _hash(key).slice(0, 62);
}

// Create new key-pair
const makeKeyPair = () => {
  const context = createContext('secp256k1')
  const privateKey = context.newRandomPrivateKey()
  return {
    public: context.getPublicKey(privateKey).asHex(),
    private: privateKey.asHex()
  }
}

const getData = async (address) => {
  try {
    /*let res = await axios({
         url: `${API_URL}/state?address=${companyAddress}`,
         method: 'get',
         timeout: 8000,
         headers: {
             'Content-Type': 'application/json',
         }
     })*/
    let res = await axios.get(`${API_URL}/state?address=${address}`)

    if (res.status == 200) {

      if (res.data.data.length == 0) {
        return "No result found, try another ID"
      } else {
        const response = res.data.data[0]
        if (response !== '') {
          parsed = JSON.parse(atob(response.data))
        }
        return parsed
      }

    } else {
      return "An error occured, Please try again later"
    }

  }
  catch (err) {
    console.error(err);
  }
}

const getFullDetails = async (address) => {
  const obj = {}

  //custom package section
  let customPackageRawResponse = await axios.get(`${API_URL}/state?address=${address}`)
  const customPackageData = JSON.parse(atob(customPackageRawResponse.data.data[0].data))
  obj.customPackage = customPackageData

  
  //catch package section
  const catchPackageId = customPackageData.catchPackageId
  const catchAddress = get_address("catch-package", catchPackageId)
  let cathcPackageRawResponse = await axios.get(`${API_URL}/state?address=${catchAddress}`)
  const catchPackageData = JSON.parse(atob(cathcPackageRawResponse.data.data[0].data))
  obj.catchPackage = catchPackageData

  //Pallet package section
  const palletNum = catchPackageData.palletNum
  const palletAddress = get_address("pallet", palletNum)
  let palletRawResponse = await axios.get(`${API_URL}/state?address=${palletAddress}`)
  const palletData = JSON.parse(atob(palletRawResponse.data.data[0].data))
  obj.pallet = palletData

  //Trip package section
  const tripNo = palletData.tripNo
  const tripAddress = get_address("trip", tripNo)
  let tripRawResponse = await axios.get(`${API_URL}/state?address=${tripAddress}`)
  const tripData = JSON.parse(atob(tripRawResponse.data.data[0].data))
  obj.trip = tripData

  return obj


}

// Submit signed Transaction to validator
const storeData = async (payload, privateKeyHex, tp) => {

   // Get transaction familt
   tpObject = getTransactionDetails(tp)
   console.log(tpObject)
  // Create signer
  const context = createContext('secp256k1')
  const privateKey = secp256k1.Secp256k1PrivateKey.fromHex(privateKeyHex)
  const signer = new Signer(context, privateKey)

  // Create the TransactionHeader

  const payloadBytes = Buffer.from(JSON.stringify(payload))
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: tpObject.family,
    familyVersion: tpObject.version,
    inputs: [tpObject.prefix],
    outputs: [tpObject.prefix],
    signerPublicKey: signer.getPublicKey().asHex(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
  }).finish()

  // Create the Transaction
  const transactionHeaderSignature = signer.sign(transactionHeaderBytes)

  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: transactionHeaderSignature,
    payload: payloadBytes
  })

  // Create the BatchHeader
  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: [transaction.headerSignature]
  }).finish()

  // Create the Batch
  const batchHeaderSignature = signer.sign(batchHeaderBytes)

  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchHeaderSignature,
    transactions: [transaction]
  })

  // Encode the Batch in a BatchList
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
  }).finish()

  console.log("submitting request to Sawtooth API")
  // Submit BatchList to Validator

  const result = await axios.post(`${API_URL}/batches`, batchListBytes, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/octet-stream'
    }
  });
  console.log(result.data)
  const link = result.data.link.split('?')[1].split('=')[1]
  return link
}

module.exports = {
  getData,
  storeData,
  getFullDetails
}