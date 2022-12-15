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
        pkCatch = data.get('pkCatch')
        packingDate = data.get('packingDate')
        agent = data.get('agent')
       
        LOGGER.info(packingDate)
        if not consumerPackageId:
            raise InvalidTransaction('Consumer Package Id is required')

        if not pkCatch:
            raise InvalidTransaction('Catch ID is required')

        if not packingDate:
            raise InvalidTransaction('Packing Date is required')

        if not agent:
            raise InvalidTransaction('agent is required')    
                   
        self._consumerPackageId = consumerPackageId
        self._pkCatch = pkCatch
        self._packingDate = packingDate
        self._agent = agent
    
    @property
    def consumerPackageId(self):
        return self._consumerPackageId

    @property
    def pkCatch(self):
        return self._pkCatch

    @property
    def packingDate(self):
        return self._packingDate

    @property
    def agent(self):
        return self._agent       
 