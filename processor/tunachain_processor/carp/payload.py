# Payload for Carp
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class CarpPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)

        carpId = data.get('carpId')
        carpName = data.get('carpName')
        carpAddress = data.get('carpAddress')
        contactInfo = data.get('contactInfo')
        

        if not carpId:
            raise InvalidTransaction('carpId is required')

        if not carpName:
            raise InvalidTransaction('carpName is required')

        if not carpAddress:
            raise InvalidTransaction('carpAddress is required')

        if not contactInfo:
            raise InvalidTransaction('contactInfo is required')

                    
        
        self._carpId = carpId
        self._carpName = carpName
        self._carpAddress = carpAddress
        self._contactInfo = contactInfo

       
       
    @property
    def carpId(self):
        return self._carpId

    @property
    def carpName(self):
        return self._carpName

    @property
    def carpAddress(self):
        return self._carpAddress        
    
    @property
    def contactInfo(self):
        return self._contactInfo
