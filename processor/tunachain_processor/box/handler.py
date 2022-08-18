# Box Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.box.payload import BoxPayload
from tunachain_processor.box.state import BoxState
from tunachain_processor.box.state import BOX_NAMESPACE


LOGGER = logging.getLogger(__name__)


class BoxTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'box'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [BOX_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = BoxPayload(transaction.payload)
        state = BoxState(context)

        LOGGER.info('Box handler apply method')
        LOGGER.info(payload)

        
        _create_box(boxId=payload.boxId,
                    quantity=payload.quantity,
                    state=state)


def _create_box(boxId, quantity, state):
    if state.get_box(boxId) is not None:
        raise InvalidTransaction(
            'Invalid action: Box already exists: {}'.format(boxId))

    state.set_box(boxId, quantity)