# Payload for Haul
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class HaulPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")

        LOGGER.info(data)

        launchDateTime = data.get('launchDateTime')
        launchPosition = data.get('launchPosition')
        launchLatitude = data.get('launchLatitude')
        launchLongitude = data.get('launchLongitude')
        haulDateTime = data.get('haulDateTime')
        haulPosition = data.get('haulPosition')
        haulLatitude = data.get('haulLatitude')
        haulLongitude = data.get('haulLongitude')
        tripNo = data.get('tripNo')


        if not launchDateTime:
            raise InvalidTransaction('Launch DateTime is required')

        if not launchPosition:
            raise InvalidTransaction('Launch Position is required')

        if not launchLatitude:
            raise InvalidTransaction('Launch Latitude is required')
        
        if not launchLongitude:
            raise InvalidTransaction('Launch Longitude is required')

        if not haulDateTime:
            raise InvalidTransaction('Haul DateTime is required')

        if not haulPosition:
            raise InvalidTransaction('Haul Position is required')                  
        
        if not haulLatitude:
            raise InvalidTransaction('Haul Latitude is required')
        
        if not haulLongitude:
            raise InvalidTransaction('Haul Longitude is required')
        
        if not tripNo:
            raise InvalidTransaction('Trip No is required')

        self._launchDateTime = launchDateTime
        self._launchPosition = launchPosition
        self._launchLatitude = launchLatitude
        self._launchLongitude = launchLongitude
        self._haulDateTime = haulDateTime
        self._haulPosition = haulPosition
        self._haulLatitude = haulLatitude
        self._haulLongitude = haulLongitude
        self._tripNo = tripNo
       
    @property
    def launchDateTime(self):
        return self._launchDateTime

    @property
    def launchPosition(self):
        return self._launchPosition

    @property
    def launchLatitude(self):
        return self._launchLatitude        
    
    @property
    def launchLongitude(self):
        return self._launchLongitude
    
    @property
    def haulDateTime(self):
        return self._haulDateTime

    @property
    def haulPosition(self):
        return self._haulPosition

    @property
    def haulLatitude(self):
        return self._haulLatitude 

    @property
    def haulLongitude(self):
        return self._haulLongitude

    @property
    def tripNo(self):
        return self._tripNo        