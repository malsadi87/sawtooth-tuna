# Generic Entity Transaction Handler
#
# Written by Amjad
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.generic.payload import GenericEntityPayload
from tunachain_processor.generic.state import GenericEntityState
from tunachain_processor.generic.state import GENERIC_ENTITY_NAMESPACE


LOGGER = logging.getLogger(__name__)

class GenericEntityTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'generic'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [GENERIC_ENTITY_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = GenericEntityPayload(transaction.payload)
        state = GenericEntityState(context)

        LOGGER.info('Generic Entity handler apply method')
        LOGGER.info(payload)
        
        _create_generic_entity(entity_type=payload.entity_type,
                        identifier=payload.identifier,
                        data_hash=payload.data_hash,
                        state=state)
    

def _create_generic_entity(entity_type, identifier, data_hash, state):
    if state.get_generic_entity(entity_type, identifier) is not None:
        raise InvalidTransaction(
            f'Invalid action: {entity_type} Entity with Indentifier {identifier} already exists!')

    state.set_generic_entity(entity_type, identifier, data_hash)