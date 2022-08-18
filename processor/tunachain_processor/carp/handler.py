# Carp Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.carp.payload import CarpPayload
from tunachain_processor.carp.state import CarpState
from tunachain_processor.carp.state import COMPANY_NAMESPACE


LOGGER = logging.getLogger(__name__)


class CarpTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'carp'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [COMPANY_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = CarpPayload(transaction.payload)
        state = CarpState(context)

        LOGGER.info('Carp handler apply method')
        LOGGER.info(payload)

        
        _create_carp(carpId=payload.carpId,
                        carpName=payload.carpName,
                        carpAddress=payload.carpAddress,
                        contactInfo=payload.contactInfo,
                        state=state)


def _create_carp(carpId, carpName, carpAddress, contactInfo, state):
    if state.get_carp(carpId) is not None:
        raise InvalidTransaction(
            'Invalid action: Carp already exists: {}'.format(carpId))

    state.set_carp(carpId, carpName, carpAddress, contactInfo)