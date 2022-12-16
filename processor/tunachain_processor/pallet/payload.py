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

        pkPallet = data.get('pkPallet')
        palletId = data.get('palletId')
        fkCompany = data.get('fkCompany')
        quantity = data.get('quantity')
        pkTrip = data.get('pkTrip')

        if not pkPallet:
            raise InvalidTransaction('Pallet Number is required')

        if not palletId:
            raise InvalidTransaction('Product Number is required')

        if not fkCompany:
            raise InvalidTransaction('Supplier ID is required')

        if not quantity:
            raise InvalidTransaction('Pallet Quantity is required')

        if not pkTrip:
            raise InvalidTransaction('Trip No is required')                  
        
        self._pkPallet = pkPallet
        self._palletId = palletId
        self._fkCompany = fkCompany
        self._quantity = quantity
        self._pkTrip = pkTrip
       
       
    @property
    def pkPallet(self):
        return self._pkPallet

    @property
    def palletId(self):
        return self._palletId

    @property
    def fkCompany(self):
        return self._fkCompany        
    
    @property
    def quantity(self):
        return self._quantity
    
    @property
    def pkTrip(self):
        return self._pkTrip