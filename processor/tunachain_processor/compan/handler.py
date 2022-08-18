# Compan Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.compan.payload import CompanPayload
from tunachain_processor.compan.state import CompanState
from tunachain_processor.compan.state import COMPANY_NAMESPACE


LOGGER = logging.getLogger(__name__)


class CompanTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'compan'

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

        payload = CompanPayload(transaction.payload)
        state = CompanState(context)

        LOGGER.info('Compan handler apply method')
        LOGGER.info(payload)

        
        _create_compan(companId=payload.companId,
                        companName=payload.companName,
                        companAddress=payload.companAddress,
                        contactInfo=payload.contactInfo,
                        state=state)


def _create_compan(companId, companName, companAddress, contactInfo, state):
    if state.get_compan(companId) is not None:
        raise InvalidTransaction(
            'Invalid action: Compan already exists: {}'.format(companId))

    state.set_compan(companId, companName, companAddress, contactInfo)