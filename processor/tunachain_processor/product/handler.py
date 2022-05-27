# Product Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.product.payload import ProductPayload
from tunachain_processor.product.state import ProductState
from tunachain_processor.product.state import PRODUCT_NAMESPACE


LOGGER = logging.getLogger(__name__)


class ProductTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'product'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [PRODUCT_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = ProductPayload(transaction.payload)
        state = ProductState(context)

        LOGGER.info('Product handler apply method')
        LOGGER.info(payload)
        
        _create_product(productId=payload.productId,
                        productName=payload.productName,
                        productDescription=payload.productDescription,
                        productNumber=payload.productNumber,
                        state=state)


def _create_product(productId, productName, productDescription, productNumber, state):
    if state.get_product(productId) is not None:
        raise InvalidTransaction(
            'Invalid action: Product already exists: {}'.format(productId))

    state.set_product(productId, productName, productDescription, productNumber)
