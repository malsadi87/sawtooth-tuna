# Payload for Company
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class CompanyPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)

        companyId = data.get('companyId')
        companyName = data.get('companyName')
        companyAddress = data.get('companyAddress')
        contactInfo = data.get('contactInfo')
        

        if not companyId:
            raise InvalidTransaction('companyId is required')

        if not companyName:
            raise InvalidTransaction('companyName is required')

        if not companyAddress:
            raise InvalidTransaction('companyAddress is required')

        if not contactInfo:
            raise InvalidTransaction('contactInfo is required')

                    
        
        self._companyId = companyId
        self._companyName = companyName
        self._companyAddress = companyAddress
        self._contactInfo = contactInfo

       
       
    @property
    def companyId(self):
        return self._companyId

    @property
    def companyName(self):
        return self._companyName

    @property
    def companyAddress(self):
        return self._companyAddress        
    
    @property
    def contactInfo(self):
        return self._contactInfo
