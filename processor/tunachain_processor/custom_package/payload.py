# Payload for CUSTOM_PACKAGE
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class ConsumerPackagePayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)


        pkConsumerPackage = data.get('pkConsumerPackage')
        fkPallet = data.get('fkPallet')
        packingDateTime = data.get('packingDateTime')
        agent = data.get('agent')
       
        LOGGER.info(packingDateTime)
        if not pkConsumerPackage:
            raise InvalidTransaction('Consumer Package Id is required')

        if not fkPallet:
            raise InvalidTransaction('Catch ID is required')

        if not packingDateTime:
            raise InvalidTransaction('Packing Date is required')

        if not agent:
            raise InvalidTransaction('agent is required')    
                   
        self._pkConsumerPackage = pkConsumerPackage
        self._fkPallet = fkPallet
        self._packingDate = packingDateTime
        self._agent = agent
    
    @property
    def pkConsumerPackage(self):
        return self._pkConsumerPackage

    @property
    def fkPallet(self):
        return self._fkPallet

    @property
    def packingDateTime(self):
        return self._packingDate

    @property
    def agent(self):
        return self._agent       
 