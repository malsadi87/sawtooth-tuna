# Payload for Speciess
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class SpeciessPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)

        speciessId = data.get('speciessId')
        quantity = data.get('quantity')
        species = data.get('species')
        packageNum = data.get('packageNum')
        launchDateTime = data.get('launchDateTime')
        

        if not speciessId:
            raise InvalidTransaction('speciessId is required')

        if not quantity:
            raise InvalidTransaction('Quantity is required')   
        
        if not species:
            raise InvalidTransaction('Species is required')

        if not packageNum:
            raise InvalidTransaction('Package Num is required')

        if not launchDateTime:
            raise InvalidTransaction('Launch Date is required')                  
        
        self._speciessId = speciessId
        self._quantity = quantity
        self._species = species
        self._packageNum = packageNum
        self._launchDateTime = launchDateTime
       
    @property
    def speciessId(self):
        return self._speciessId

    @property
    def quantity(self):
        return self._quantity

    @property
    def species(self):
        return self._species       
    
    @property
    def packageNum(self):
        return self._packageNum
    
    @property
    def launchDateTime(self):
        return self._launchDateTime
