# Payload for CUSTOM_PACKAGE
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class CustomPackagePayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)


        consumerPackageId = data.get('consumerPackageId')
        catchPackageId = data.get('catchPackageId')
        packingDate = data.get('PackingDate')
        agent = data.get('agent')
       

        if not consumerPackageId:
            raise InvalidTransaction('Consumer Package Id is required')

        if not catchPackageId:
            raise InvalidTransaction('Catch Package ID is required')

        if not packingDate:
            raise InvalidTransaction('Packing Date is required')

        if not agent:
            raise InvalidTransaction('agent is required')    
                   
        self._consumerPackageId = consumerPackageId
        self._catchPackageId = catchPackageId
        self._packingDate = packingDate
        self._agent = agent
    
    @property
    def consumerPackageId(self):
        return self._consumerPackageId

    @property
    def catchPackageId(self):
        return self._catchPackageId

    @property
    def packingDate(self):
        return self._packingDate

    @property
    def agent(self):
        return self._agent       
 