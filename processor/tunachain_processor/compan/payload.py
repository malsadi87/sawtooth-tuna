# Payload for Compan
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class CompanPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)

        companId = data.get('companId')
        companName = data.get('companName')
        companAddress = data.get('companAddress')
        contactInfo = data.get('contactInfo')
        

        if not companId:
            raise InvalidTransaction('companId is required')

        if not companName:
            raise InvalidTransaction('companName is required')

        if not companAddress:
            raise InvalidTransaction('companAddress is required')

        if not contactInfo:
            raise InvalidTransaction('contactInfo is required')

                    
        
        self._companId = companId
        self._companName = companName
        self._companAddress = companAddress
        self._contactInfo = contactInfo

       
       
    @property
    def companId(self):
        return self._companId

    @property
    def companName(self):
        return self._companName

    @property
    def companAddress(self):
        return self._companAddress        
    
    @property
    def contactInfo(self):
        return self._contactInfo
