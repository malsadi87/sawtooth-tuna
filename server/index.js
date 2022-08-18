const express = require('express')
const app = express()
const parser = require("body-parser")
const { urlencoded } = require("body-parser")
const crypto = require('crypto')


app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))

const { getData, storeData } = require('./utils')

const { ConsensusFailBlockRequest } = require('sawtooth-sdk/protobuf')

//SERVER CONFIG
const port = 3005


/*
   Calculate the sha512 of a value and then find it's address.
*/

const _hash = (x) =>
  crypto.createHash('sha512').update(x).digest('hex').toLowerCase()


const get_address = (name, key) => {
  const namespace = _hash(name).substring(0, 6)
  return namespace + "00" + _hash(key).slice(0, 62);
}

/*
   Carp API endpoints .
*/
app.post("/addCarp", async (req, res) => {
  let privateKey = req.body.privateKey;
  let id = req.body.id;
  let name = req.body.name;
  let address = req.body.address;
  let contactInfo = req.body.contactInfo;
  const payload = {
    "carpId": id,
    "carpName": name,
    "carpAddress": address,
    "contactInfo": contactInfo
  }
  console.log(payload)
  storeData(payload, privateKey, "carp").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getCarp', async (req, res) => {
  let id = req.query.id
  const carpAddress = get_address("carp", id)
  getData(carpAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})


/*
   Company API endpoints .
*/
app.post("/addCompany", async (req, res) => {
  let privateKey = req.body.privateKey;
  let id = req.body.id;
  let name = req.body.name;
  let address = req.body.address;
  let contactInfo = req.body.contactInfo;
  const payload = {
    "companyId": id,
    "companyName": name,
    "companyAddress": address,
    "contactInfo": contactInfo
  }
  console.log(payload)
  storeData(payload, privateKey, "company").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getCompany', async (req, res) => {
  let id = req.query.id
  const companyAddress = get_address("company", id)
  getData(companyAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})

/*
   Box API endpoints .
*/
app.post("/addBox", async (req, res) => {
  let privateKey = req.body.privateKey;
  let id = req.body.id;
  const payload = {
    "boxId": id,
  }
  console.log(payload)
  storeData(payload, privateKey, "box").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getBox', async (req, res) => {
  let id = req.query.id
  const boxAddress = get_address("box", id)
  getData(boxAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})

/*
   Compan API endpoints .
*/
app.post("/addCompan", async (req, res) => {
  let privateKey = req.body.privateKey;
  let id = req.body.id;
  let name = req.body.name;
  let address = req.body.address;
  let contactInfo = req.body.contactInfo;
  const payload = {
    "companId": id,
    "companName": name,
    "companAddress": address,
    "contactInfo": contactInfo
  }
  console.log(payload)
  storeData(payload, privateKey, "compan").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getCompan', async (req, res) => {
  let id = req.query.id
  const companAddress = get_address("compan", id)
  getData(companAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})

/*
   Companytwo API endpoints .
*/
app.post("/addCompanytwo", async (req, res) => {
  let privateKey = req.body.privateKey;
  let id = req.body.id;
  let name = req.body.name;
  let address = req.body.address;
  let contactInfo = req.body.contactInfo;
  const payload = {
    "companytwoId": id,
    "companytwoName": name,
    "companytwoAddress": address,
    "contactInfo": contactInfo
  }
  console.log(payload)
  storeData(payload, privateKey, "companytwo").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getCompanytwo', async (req, res) => {
  let id = req.query.id
  const companytwoAddress = get_address("companytwo", id)
  getData(companytwoAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})


/*
   trip API endpoints .
*/
app.post("/addTrip", async (req, res) => {
  let privateKey = req.body.privateKey;
  let tripNo = req.body.tripNo;
  let tripWithinYearNo = req.body.tripWithinYearNo;
  let vesselName = req.body.vesselName;
  let departureDate = req.body.departureDate;
  let departurePort = req.body.departurePort;
  let landingDate = req.body.landingDate;
  let landingPort = req.body.landingPort;
  const payload = {
    "tripNo": tripNo,
    "tripWithinYearNo": tripWithinYearNo,
    "vesselName": vesselName,
    "departureDate": departureDate,
    "departurePort": departurePort,
    "landingDate": landingDate,
    "landingPort": landingPort
  }
  storeData(payload, privateKey, "trip").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getTrip', async (req, res) => {
  let tripNo = req.query.tripNo
  const tripAddress = get_address("trip", tripNo)
  getData(tripAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})

/*
   haul API endpoints .
*/
app.post("/addHaul", async (req, res) => {
  let privateKey = req.body.privateKey;
  let tripNo = req.body.tripNo;
  let launchDateTime = req.body.launchDateTime;
  let launchPosition = req.body.launchPosition;
  let launchLatitude = req.body.launchLatitude;
  let launchLongitude = req.body.launchLongitude;
  let haulDateTime = req.body.haulDateTime;
  let haulPosition = req.body.haulPosition;
  let haulLatitude = req.body.haulLatitude;
  let haulLongitude = req.body.haulLongitude;
  const payload = {   
  "launchDateTime": launchDateTime,
  "launchPosition": launchPosition,
  "launchLatitude": launchLatitude,
  "launchLongitude": launchLongitude,
  "haulDateTime": haulDateTime,
  "haulPosition": haulPosition,
  "haulLatitude": haulLatitude,
  "haulLongitude": haulLongitude,
  "tripNo": tripNo
}
  console.log(payload)
  storeData(payload, privateKey, "haul").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getHaul', async (req, res) => {
  let launchDateTime = req.query.launchDateTime
  const haulAddress = get_address("haul", launchDateTime)
  getData(haulAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})


/*
   pallet-event API endpoints .
*/
app.post("/addPalletEvent", async (req, res) => {
  let privateKey = req.body.privateKey;
  let eventTime = req.body.eventTime;
  let palletNum = req.body.palletNum;
  let temperature = req.body.temperature;
  let location = req.body.location;
  let tilt = req.body.tilt;
  let shock = req.body.shock;
  const payload = {   
  "palletNum": palletNum,
  "eventTime": eventTime,
  "temperature": temperature,
  "location": location,
  "tilt": tilt,
  "shock": shock
}

console.log("addPalletEvent payload => " , payload)
  storeData(payload, privateKey, "pallet-event").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getPalletEvent', async (req, res) => {
  let palletNum = req.query.palletNum
  let eventTime = req.query.eventTime
  const identifier = palletNum + eventTime
  const address = get_address("pallet-event", identifier)
  getData(address).then(response => {
    console.log(response)
    res.send(response)
  })
})


/*
   pallet API endpoints .
*/
app.post("/addPallet", async (req, res) => {
  let privateKey = req.body.privateKey;
  let tripNo = req.body.tripNo;
  let palletNum = req.body.palletNum;
  let productNum = req.body.productNum;
  let supplierId = req.body.supplierId;
  let palletWeight = req.body.palletWeight;
  
  const payload = {   
  "palletNum": palletNum,
  "productNum": productNum,
  "supplierId": supplierId,
  "palletWeight": palletWeight,
  "tripNo": tripNo
}
  storeData(payload, privateKey, "pallet").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getPallet', async (req, res) => {
  let palletNum = req.query.palletNum
  const palletAddress = get_address("pallet", palletNum)
  getData(palletAddress).then(response => {
    console.log(response)
    res.send(response)
  })
})


/*
   species API endpoints .
*/
app.post("/addSpecies", async (req, res) => {
  let privateKey = req.body.privateKey;
  let speciesId = req.body.speciesId;
  let quantity = req.body.quantity;
  let species = req.body.species;
  let packageNum = req.body.packageNum;
  let launchDateTime = req.body.launchDateTime;
  
  const payload = {   
  "speciesId": speciesId,
  "quantity": quantity,
  "species": species,
  "packageNum": packageNum,
  "launchDateTime": launchDateTime
}
console.log("addSpecies payload => " , payload)
  storeData(payload, privateKey, "species").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getSpecies', async (req, res) => {
  let speciesId = req.query.speciesId
  const address = get_address("species", speciesId)
  getData(address).then(response => {
    console.log(response)
    res.send(response)
  })
})


/*
   catch-package API endpoints .
*/
app.post("/addCatchPackage", async (req, res) => {
  let privateKey = req.body.privateKey;
  let catchPackageId = req.body.catchPackageId;
  let packingDate = req.body.packingDate;
  let palletNum = req.body.palletNum;
 
  const payload = {   
  "catchPackageId": catchPackageId,
  "packingDate": packingDate,
  "palletNum": palletNum
}
  storeData(payload, privateKey, "catch-package").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getCatchPackage', async (req, res) => {
  let catchPackageId = req.query.catchPackageId
  const address = get_address("catch-package", catchPackageId)
  getData(address).then(response => {
    console.log(response)
    res.send(response)
  })
})


/*
   custom-package API endpoints .
*/
app.post("/addCustomPackage", async (req, res) => {
  let privateKey = req.body.privateKey;
  let consumerPackageId = req.body.consumerPackageId;
  let catchPackageId = req.body.catchPackageId;
  let packingDate = req.body.packingDate;
  let agent = req.body.agent;
 
  const payload = {   
  "consumerPackageId":consumerPackageId,
  "catchPackageId": catchPackageId,
  "packingDate": packingDate,
  "agent": agent
}
  storeData(payload, privateKey, "custom-package").then(response => {
    console.log(response)
    res.send(response)
  })

})

app.get('/getCustomPackage', async (req, res) => {
  let consumerPackageId = req.query.consumerPackageId
  const address = get_address("custom-package", consumerPackageId)
  getData(address).then(response => {
    console.log(response)
    res.send(response)
  })
})




//Define request response in root URL (/)
app.get('/', function (req, res) {

  res.send("Hello, World!")
})







//Launch listening server on port 3000
app.listen(port, function () {
  console.log('app listening on port ${port}!')
})