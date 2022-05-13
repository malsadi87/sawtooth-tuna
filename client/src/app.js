// SPDX-License-Identifier: Apache-2.0

/*
This code was written by Zac Delventhal @delventhalz.
Original source code can be found here: https://github.com/delventhalz/transfer-chain-js/blob/master/client/src/app.js
 */

'use strict'

const $ = require('jquery')
//const hashlib = require("hashlib")
const crypto = require('crypto')
const {
  getKeys,
  makeKeyPair,
  saveKeys,
  getState,
  submitUpdate,
  getFishByID,
  updateRegistry,
  getValueByKey
} = require('./state')
const {
  addOption,
  addRow,
  addAction
} = require('./components')

const map = L.map('map', {
  center: [51.505, -0.09],
  zoom: 13,
  layers: [
      new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      })
  ]
});


const _hash = (x) =>
  crypto.createHash('sha512').update(x).digest('hex').toLowerCase()


const TUNACHAIN_NAMESPACE = _hash("transfer-chain").substring(0, 6)

const get_asset_address = (asset)=> {
  return TUNACHAIN_NAMESPACE + "00" + _hash(asset).slice(0, 62);
}

const get_meta_key_address = (key) => {
  return _hash("cross-chain").substring(0,6) + "00" + _hash(key).slice(0, 62);
}




const concatNewOwners = (existing, ownerContainers) => {
  return existing.concat(ownerContainers
    .filter(({ owner }) => !existing.includes(owner))
    .map(({ owner }) => owner))
}

// Application Object
const app = { user: null, keys: [], assets: [], transfers: [] }

app.refresh = function () {

  getState(({ assets, transfers }) => {
    this.assets = assets
    this.transfers = transfers

    // Clear existing data views
    $('#assetList').empty()
    $('#transferList').empty()
    $('[name="assetSelect"]').children().slice(1).remove()
    $('[name="transferSelect"]').children().slice(1).remove()

    // Populate asset views
    assets.forEach(asset => {
      //const location = JSON.stringify(asset.location)
      const lat = parseFloat(asset.location.latitude)
      console.log(lat)
      const lon = parseFloat(asset.location.longitude)
      console.log(lon)
      //console.log('location : ' + location)
      addRow('#assetList',asset.fishID, asset.name, asset.owner, asset.weight)
      const marker = L.marker([lat, lon]).addTo(map);
      marker.bindPopup(asset.name).openPopup();
      if (this.user && asset.owner === this.user.public) {
        addOption('[name="assetSelect"]', asset.name)
      }
    })

    // Populate transfer list for selected user
    transfers.filter(transfer => transfer.owner === this.user.public)
      .forEach(transfer => addAction('#transferList', transfer.asset, 'Accept'))

    // Populate transfer select with both local and blockchain keys
    let publicKeys = this.keys.map(pair => pair.public)
    publicKeys = concatNewOwners(publicKeys, assets)
    publicKeys = concatNewOwners(publicKeys, transfers)
    publicKeys.forEach(key => addOption('[name="transferSelect"]', key))
  })
}

app.update = function (action, asset, owner, weight, location) {
  if (this.user) {
    if(action == 'create'){
      const fishID = Date.now().toString()
      console.log({action,fishID, asset, owner, weight, location})
      submitUpdate(
        { action, fishID, asset, owner, weight, location },
        this.user.private,
        success => success ? this.refresh() : null
      )

    } else{
      submitUpdate(
        { action, asset, owner},
        this.user.private,
        success => success ? this.refresh() : null
      )
    }

  }
}
app.queryLedger = function(fishID){
const fishAddress = get_asset_address(fishID)
console.log(fishAddress)
getFishByID(fishAddress)
}

app.addMetaData = function(key, value){
  console.log('add meta data  function')
  updateRegistry(
    {key, value},
    this.user.private,
    success => success ? this.refresh() : null
  )
  }

  app.getMetaValue = function(key){
    const address = get_meta_key_address(key)
    console.log('getMetaValue : ' , address)
    getValueByKey(address)
    }

// Select User
$('[name="keySelect"]').on('change', function () {
  if (this.value === 'new') {
    app.user = makeKeyPair()
    app.keys.push(app.user)
    saveKeys(app.keys)
    addOption(this, app.user.public, true)
    addOption('[name="transferSelect"]', app.user.public)
  } else if (this.value === 'none') {
    app.user = null
  } else {
    app.user = app.keys.find(key => key.public === this.value)
    app.refresh()
  }
})

// Create Fish
$('#createSubmitFish').on('click', function () {
  const asset = $('#createName').val()
  const weight = $('#weight').val()
  const location = {
    "latitude" : $('#latitude').val(),
    "longitude": $('#longitude').val()
  }
  console.log('creating new fish assest: ' + asset)
  if (asset) app.update('create', asset, '', weight, location)
})

// Create Pallet
$('#createSubmitPallet').on('click', function () {
    const palletID = $('#createPalletID').val()
    const palletVID = $('#createPalletVID').val()
    const palletProductID = $('#createProductID').val()
    const palletDate = $('#createDate').val()
    const palletNumber = $('#createPalletNumber').val()
    const palletProductNumber = $('#createProductNumber').val()
    const palletWeight = $('#createWeight').val()
    const palletTemperature = $('#createPalletTemperature').val()
    console.log('creating new pallet with ID: ' + palletID)
})

// search ledger for a specific fish
$('#searchFish').on('click', function () {
  const fishID = $('#fishID').val()
  console.log('searching ledger for the following fish: ' + fishID)
  if (fishID) app.queryLedger(fishID)
})

// add metadata entry
$('#addMeta').on('click', function () {
  const key = $('#meta_key').val()
  const value = $('#meta_val').val()
  console.log('adding : ', key, 'and ', value)
  if (key) app.addMetaData(key, value)
})

// search ledger for a specific fish
$('#getValue').on('click', function () {
  const key = $('#meta_key').val()
  console.log('searching ledger for the following key: ' + key)
  if (key) app.getMetaValue(key)
})

// Transfer Asset
$('#transferSubmit').on('click', function () {
  const asset = $('[name="assetSelect"]').val()
  const owner = $('[name="transferSelect"]').val()
  if (asset && owner) app.update('transfer', asset, owner)
})

// Accept Asset
$('#transferList').on('click', '.accept', function () {
  const asset = $(this).prev().text()
  if (asset) app.update('accept', asset)
})

$('#transferList').on('click', '.reject', function () {
  const asset = $(this).prev().prev().text()
  if (asset) app.update('reject', asset)
})

// Initialize
app.keys = getKeys()
app.keys.forEach(pair => addOption('[name="keySelect"]', pair.public))
app.refresh()
