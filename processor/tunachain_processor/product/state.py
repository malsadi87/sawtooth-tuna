# Product State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


PRODUCT_NAMESPACE = hashlib.sha512(
    'product'.encode('utf-8')).hexdigest()[0:6]


def _get_address(productId):
    adr = hashlib.sha512(productId.encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_product_address(productId):
    add =  PRODUCT_NAMESPACE + '00' + _get_address(productId)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class ProductState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_product(self, productId):
        return self._get_state(_get_product_address(productId))


    def set_product(self, productId, productName, productDescription, productNumber):
        address = _get_product_address(productId)
        LOGGER.info('set_product method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "productId": productId,
                "productName": productName,
                "productDescription": productDescription,
                "productNumber": productNumber

            })
        return self._context.set_state(
            {address: state_data}, timeout=self.TIMEOUT)

    def _get_state(self, address):
        state_entries = self._context.get_state(
            [address], timeout=self.TIMEOUT)
        if state_entries:
            entry = _deserialize(data=state_entries[0].data)
        else:
            entry = None
        return entry
