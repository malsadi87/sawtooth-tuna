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


def _get_address(pkProduct):
    adr = hashlib.sha512(str(pkProduct).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_product_address(pkProduct):
    add =  PRODUCT_NAMESPACE + '00' + _get_address(pkProduct)
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

    def get_product(self, pkProduct):
        return self._get_state(_get_product_address(pkProduct))


    def set_product(self, pkProduct, title, productId, productId):
        address = _get_product_address(pkProduct)
        LOGGER.info('set_product method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "pkProduct": pkProduct,
                "title": title,
                "productId": productId,
                "productId": productId

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
