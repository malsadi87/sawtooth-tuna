# Payload for CATCH_PACKAGE
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class CatchPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)


        pkCatch = data.get('pkCatch')
        updatedDateTime = data.get('updatedDateTime')
        palletNum = data.get('palletNum')
       

        if not palletNum:
            raise InvalidTransaction('Pallet Number is required')

        if not pkCatch:
            raise InvalidTransaction('Catch ID is required')

        if not updatedDateTime:
            raise InvalidTransaction('Packing Date is required')
                   
        
        self._pkCatch = pkCatch
        self._packingDate = updatedDateTime
        self._palletNum = palletNum
    
       
    @property
    def pkCatch(self):
        return self._pkCatch

    @property
    def updatedDateTime(self):
        return self._packingDate

    @property
    def palletNum(self):
        return self._palletNum        
 