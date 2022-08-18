const $ = require('jquery')
const {createHash} = require('crypto')
const protobuf = require('sawtooth-sdk/protobuf')
const {
  createContext,
  Signer
} = require('sawtooth-sdk/signing')
const secp256k1 = require('sawtooth-sdk/signing/secp256k1')

// Config variables
const KEY_NAME = 'transfer-chain.keys'
const API_URL = 'http://localhost:8000/api'

const transactions=[
    {family:"speciess",version:"0.1", prefix:""},
    {family:"company",version:"0.1", prefix:""},
    {family:"haul",vesion:"0.1", prefix:""},
    {family:"pallet",version:"0.1", prefix:""},
    {family:"pallet-event",vesion:"0.1", prefix:""},
    {family:"custom-package",version:"0.1", prefix:""},
    {family:"product",vesion:"0.1", prefix:""},
    {family:"species",vesion:"0.1", prefix:""},
    {family:"trip",version:"0.1", prefix:""},
    {family:"product",vesion:"0.1", prefix:""},
]

const getTransactionDetails = (name) => {
    let result = transactions.find(transaction => transaction.name === name)
    return result
}

const updateLedger = (name, payload, privateKeyHex, cb) => {
    // Create signer
    const context = createContext('secp256k1')
    const privateKey = secp256k1.Secp256k1PrivateKey.fromHex(privateKeyHex)
    const signer = new Signer(context, privateKey)
    //const PREF = createHash('sha512').update("cross-chain'").digest('hex').toLowerCase().substring(0, 6)
    // Create the TransactionHeader
    txDetails = getTransactionDetails(name)
    console.log('updateRegistry method: ')
    console.log('PREF ', PREFIX2)
    console.log(JSON.stringify(payload))
    const payloadBytes = Buffer.from(JSON.stringify(payload))
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      familyName: txDetails["name"],
      familyVersion: txDetails["version"],
      inputs: [txDetails["prefix"]],
      outputs: [txDetails["prefix"]],
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
  
    // Submit BatchList to Validator
    $.post({
      url: `${API_URL}/batches`,
      data: batchListBytes,
      headers: {'Content-Type': 'application/octet-stream'},
      processData: false,
      success: function( resp ) {
        var id = resp.link.split('?')[1]
        $.get(`${API_URL}/batch_statuses?${id}&wait`, ({ data }) => cb(true))
      },
      error: () => cb(false)
    })
  }

