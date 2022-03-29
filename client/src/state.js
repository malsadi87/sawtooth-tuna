// SPDX-License-Identifier: Apache-2.0

/*
This code was written by Zac Delventhal @delventhalz.
Original source code can be found here: https://github.com/delventhalz/transfer-chain-js/blob/master/client/src/state.js
 */

'use strict'

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

const FAMILY = 'transfer-chain'
const VERSION = '0.0'
const PREFIX = '19d832'

const FAMILY2 = 'cross-chain'
const VERSION2 = '0.1'
const PREFIX2 = '5978b3'

// Fetch key-pairs from localStorage
const getKeys = () => {
  const storedKeys = localStorage.getItem(KEY_NAME)
  if (!storedKeys) return []

  return storedKeys.split(';').map((pair) => {
    const separated = pair.split(',')
    return {
      public: separated[0],
      private: separated[1]
    }
  })
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

// Save key-pairs to localStorage
const saveKeys = keys => {
  const paired = keys.map(pair => [pair.public, pair.private].join(','))
  localStorage.setItem(KEY_NAME, paired.join(';'))
}

//Fetch Fish by it's ID
const getFishByID =  (fishAddress) => {
  $.get(`${API_URL}/state?address=${fishAddress}`, ({ data }) => {
    console.log(data)
    //return data
    data.reduce((processed, datum) => {
      if (datum.data !== '') {
        const parsed = JSON.parse(atob(datum.data))
        console.log(parsed)
      }
      return processed
    }, {transfers: []})
  })
}

//Fetch MetaValue by it's Key
const getValueByKey =  (keyAddress) => {
  $.get(`${API_URL}/state?address=${keyAddress}`, ({ data }) => {
    console.log(data)
    //return data
    data.reduce((processed, datum) => {
      if (datum.data !== '') {
        const parsed = JSON.parse(atob(datum.data))
        console.log(parsed)
      }
      return processed
    }, {transfers: []})
  })
}

// Fetch current Sawtooth Tuna Chain state from validator
const getState = cb => {
  $.get(`${API_URL}/state?address=${PREFIX}`, ({ data }) => {
    console.log(data)
    cb(data.reduce((processed, datum) => {
      if (datum.data !== '') {
        const parsed = JSON.parse(atob(datum.data))
        if (datum.address[7] === '0') processed.assets.push(parsed)
        if (datum.address[7] === '1') processed.transfers.push(parsed)
      }
      return processed
    }, {assets: [], transfers: []}))
  })
}

// Submit signed Transaction to validator
const submitUpdate = (payload, privateKeyHex, cb) => {
  // Create signer
  const context = createContext('secp256k1')
  const privateKey = secp256k1.Secp256k1PrivateKey.fromHex(privateKeyHex)
  const signer = new Signer(context, privateKey)

  // Create the TransactionHeader
  const payloadBytes = Buffer.from(JSON.stringify(payload))
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: FAMILY,
    familyVersion: VERSION,
    inputs: [PREFIX],
    outputs: [PREFIX],
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

const updateRegistry = (payload, privateKeyHex, cb) => {
  // Create signer
  const context = createContext('secp256k1')
  const privateKey = secp256k1.Secp256k1PrivateKey.fromHex(privateKeyHex)
  const signer = new Signer(context, privateKey)
  //const PREF = createHash('sha512').update("cross-chain'").digest('hex').toLowerCase().substring(0, 6)
  // Create the TransactionHeader
  console.log('updateRegistry method: ')
  console.log('PREF ', PREFIX2)
  console.log(JSON.stringify(payload))
  const payloadBytes = Buffer.from(JSON.stringify(payload))
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: FAMILY2,
    familyVersion: VERSION2,
    inputs: [PREFIX2],
    outputs: [PREFIX2],
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

module.exports = {
  getKeys,
  makeKeyPair,
  saveKeys,
  getState,
  submitUpdate,
  updateRegistry,
  getFishByID,
  getValueByKey
}
