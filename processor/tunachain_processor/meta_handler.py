# Metdata Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.metadata_payload import MetadataPayload
from tunachain_processor.metadata_state import MetadataState
from tunachain_processor.metadata_state import METADATA_NAMESPACE


LOGGER = logging.getLogger(__name__)


class MetadataTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'cross-chain'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [METADATA_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = MetadataPayload(transaction.payload)
        state = MetadataState(context)

        LOGGER.info('meta data handler apply method')
        LOGGER.info(payload)
        
        _create_metadata(key=payload.key,
                          value=payload.value,
                          state=state)


def _create_metadata(key, value, state):
    if state.get_metadata(key) is not None:
        raise InvalidTransaction(
            'Invalid action: Pier already exists: {}'.format(key))

    state.set_metadata(key, value)
