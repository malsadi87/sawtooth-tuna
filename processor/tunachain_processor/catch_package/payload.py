# Payload for CATCH_PACKAGE
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class CatchPackagePayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)


        catchPackageId = data.get('catchPackageId')
        packingDate = data.get('packingDate')
        palletNum = data.get('palletNum')
       

        if not palletNum:
            raise InvalidTransaction('Pallet Number is required')

        if not catchPackageId:
            raise InvalidTransaction('Catch Package ID is required')

        if not packingDate:
            raise InvalidTransaction('Packing Date is required')
                   
        
        self._catchPackageId = catchPackageId
        self._packingDate = packingDate
        self._palletNum = palletNum
    
       
    @property
    def catchPackageId(self):
        return self._catchPackageId

    @property
    def packingDate(self):
        return self._packingDate

    @property
    def palletNum(self):
        return self._palletNum        
 