# Payload for Companytwo
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class CompanytwoPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)

        companytwoId = data.get('companytwoId')
        companytwoName = data.get('companytwoName')
        companytwoAddress = data.get('companytwoAddress')
        contactInfo = data.get('contactInfo')
        

        if not companytwoId:
            raise InvalidTransaction('companytwoId is required')

        if not companytwoName:
            raise InvalidTransaction('companytwoName is required')

        if not companytwoAddress:
            raise InvalidTransaction('companytwoAddress is required')

        if not contactInfo:
            raise InvalidTransaction('contactInfo is required')

                    
        
        self._companytwoId = companytwoId
        self._companytwoName = companytwoName
        self._companytwoAddress = companytwoAddress
        self._contactInfo = contactInfo

       
       
    @property
    def companytwoId(self):
        return self._companytwoId

    @property
    def companytwoName(self):
        return self._companytwoName

    @property
    def companytwoAddress(self):
        return self._companytwoAddress        
    
    @property
    def contactInfo(self):
        return self._contactInfo
