# Payload for pallet
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class PalletPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)

        palletNum = data.get('palletNum')
        productId = data.get('productId')
        supplierId = data.get('supplierId')
        palletWeight = data.get('palletWeight')
        pkTrip = data.get('pkTrip')

        if not palletNum:
            raise InvalidTransaction('Pallet Number is required')

        if not productId:
            raise InvalidTransaction('Product Number is required')

        if not supplierId:
            raise InvalidTransaction('Supplier ID is required')

        if not palletWeight:
            raise InvalidTransaction('Pallet Weight is required')

        if not pkTrip:
            raise InvalidTransaction('Trip No is required')                  
        
        self._palletNum = palletNum
        self._productId = productId
        self._supplierId = supplierId
        self._palletWeight = palletWeight
        self._pkTrip = pkTrip
       
       
    @property
    def palletNum(self):
        return self._palletNum

    @property
    def productId(self):
        return self._productId

    @property
    def supplierId(self):
        return self._supplierId        
    
    @property
    def palletWeight(self):
        return self._palletWeight
    
    @property
    def pkTrip(self):
        return self._pkTrip