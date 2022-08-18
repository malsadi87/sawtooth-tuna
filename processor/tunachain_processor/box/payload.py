# Payload for Box
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class BoxPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)

        boxId = data.get('boxId')
        quantity = data.get('quantity')

        

        if not boxId:
            raise InvalidTransaction('boxId is required')

        if not quantity:
            raise InvalidTransaction('Quantity is required')   
        
        self._boxId = boxId
        self._quantity = quantity
       
       
    @property
    def boxId(self):
        return self._boxId

    @property
    def quantity(self):
        return self._quantity
