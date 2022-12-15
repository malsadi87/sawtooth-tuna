# Payload for Trip
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class TripPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")

        LOGGER.info(data)

        pkTrip = data.get('pkTrip')
        tripWithinYearNo = data.get('tripWithinYearNo')
        vesselName = data.get('vesselName')
        departureDate = data.get('departureDate')
        departurePort = data.get('departurePort')
        landingDate = data.get('landingDate')
        landingPort = data.get('landingPort')

        if not pkTrip:
            raise InvalidTransaction('Trip No is required')

        if not tripWithinYearNo:
            raise InvalidTransaction('Trip Within Year No is required')

        if not vesselName:
            raise InvalidTransaction('Vessel Name is required')

        if not departureDate:
            raise InvalidTransaction('Departure Date is required')
        
        if not departurePort:
            raise InvalidTransaction('Departure Port is required')

        if not landingDate:
            raise InvalidTransaction('Landing Date is required')                  
        
        if not landingPort:
            raise InvalidTransaction('Landing Port is required')

        self._pkTrip = pkTrip
        self._tripWithinYearNo = tripWithinYearNo
        self._vesselName = vesselName
        self._departureDate = departureDate
        self._departurePort = departurePort
        self._landingDate = landingDate
        self._landingPort = landingPort
       
    @property
    def pkTrip(self):
        return self._pkTrip

    @property
    def tripWithinYearNo(self):
        return self._tripWithinYearNo

    @property
    def vesselName(self):
        return self._vesselName        
    
    @property
    def departureDate(self):
        return self._departureDate
    
    @property
    def departurePort(self):
        return self._departurePort

    @property
    def landingDate(self):
        return self._landingDate

    @property
    def landingPort(self):
        return self._landingPort  