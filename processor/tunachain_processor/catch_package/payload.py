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


        packageNum = data.get('packageNum')
        packingDate = data.get('packingDate')
        palletNum = data.get('palletNum')
       

        if not palletNum:
            raise InvalidTransaction('Pallet Number is required')

        if not packageNum:
            raise InvalidTransaction('Package Num is required')

        if not packingDate:
            raise InvalidTransaction('Packing Date is required')
                   
        
        self._packageNum = packageNum
        self._packingDate = packingDate
        self._palletNum = palletNum
    
       
    @property
    def packageNum(self):
        return self._packageNum

    @property
    def packingDate(self):
        return self._packingDate

    @property
    def palletNum(self):
        return self._palletNum        
 