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
        productId = data.get('productId')
        productName = data.get('productName')
        productDescription = data.get('productDescription')
        productNum = data.get('productNum')

        if not productId:
            raise InvalidTransaction('Product ID is required')

        if not productName:
            raise InvalidTransaction('Product Name is required')

        if not productNum:
            raise InvalidTransaction('Product Number is required')        
        
        self._productId = productId
        self._productName = productName
        self._productDescription = productDescription
        self._productNum = productNum
       
    @property
    def productId(self):
        return self._productId
    
    @property
    def productName(self):
        return self._productName

    @property
    def productDescription(self):
        return self._productDescription

    @property
    def productNum(self):
        return self._productNum  