# Payload for product
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class ProductPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)
        pkProduct = data.get('pkProduct')
        title = data.get('title')
        palletId = data.get('palletId')
        palletId = data.get('palletId')

        if not pkProduct:
            raise InvalidTransaction('Product ID is required')

        if not title:
            raise InvalidTransaction('Product Name is required')

        if not palletId:
            raise InvalidTransaction('Product Number is required')        
        
        self._pkProduct = pkProduct
        self._title = title
        self._productDescription = palletId
        self._palletId = palletId
       
    @property
    def pkProduct(self):
        return self._pkProduct
    
    @property
    def title(self):
        return self._title

    @property
    def palletId(self):
        return self._productDescription

    @property
    def palletId(self):
        return self._palletId  