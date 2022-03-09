// SPDX-License-Identifier: Apache-2.0

/*
This code was written by Zac Delventhal @delventhalz.
Original source code can be found here: https://github.com/delventhalz/transfer-chain-js/blob/master/client/src/app.js
 */

'use strict'

const $ = require('jquery')
const {
  getKeys,
  makeKeyPair,
  saveKeys,
  getState,
  submitUpdate
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
      addRow('#assetList', asset.name, asset.owner, asset.weight)
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
      console.log({action, asset, owner, weight, location})
      submitUpdate(
        { action, asset, owner, weight, location },
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

// Create Asset
$('#createSubmit').on('click', function () {
  const asset = $('#createName').val()
  const weight = $('#weight').val()
  const location = {
    "latitude" : $('#latitude').val(),
    "longitude": $('#longitude').val()
  }
  console.log('creating new fish assest: ' + asset)
  if (asset) app.update('create', asset, '', weight, location)
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
