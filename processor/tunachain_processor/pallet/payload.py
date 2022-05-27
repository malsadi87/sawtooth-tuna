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
        palletId = data.get('palletId')
        palletVid = data.get('palletVid')
        palletNumber = data.get('palletNumber')
        date = data.get('date')
        weight = data.get('weight')
        productId = data.get('productId')
        productNumber = data.get('productNumber')

        if not productId:
            raise InvalidTransaction('Product ID is required')

        if not productNumber:
            raise InvalidTransaction('Product Number is required')

        if not palletId:
            raise InvalidTransaction('Pallet ID is required')

        if not palletVid:
            raise InvalidTransaction('Pallet VID is required')

        if not weight:
            raise InvalidTransaction('Pallet Weight is required')                  
        
        self._palletId = palletId
        self._palletVid = palletVid
        self._palletNumber = palletNumber
        self._productId = productId
        self._date = date
        self._weight = weight
        self._productNumber = productNumber
       
    @property
    def palletId(self):
        return self._palletId

    @property
    def palletVid(self):
        return self._palletVid

    @property
    def palletNumber(self):
        return self._palletNumber        
    
    @property
    def productId(self):
        return self._productId
    
    @property
    def date(self):
        return self._date

    @property
    def weight(self):
        return self._weight

    @property
    def productNumber(self):
        return self._productNumber  