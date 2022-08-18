# Companytwo Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.companytwo.payload import CompanytwoPayload
from tunachain_processor.companytwo.state import CompanytwoState
from tunachain_processor.companytwo.state import COMPANY_NAMESPACE


LOGGER = logging.getLogger(__name__)


class CompanytwoTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'companytwo'

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

        payload = CompanytwoPayload(transaction.payload)
        state = CompanytwoState(context)

        LOGGER.info('Companytwo handler apply method')
        LOGGER.info(payload)

        
        _create_companytwo(companytwoId=payload.companytwoId,
                        companytwoName=payload.companytwoName,
                        companytwoAddress=payload.companytwoAddress,
                        contactInfo=payload.contactInfo,
                        state=state)


def _create_companytwo(companytwoId, companytwoName, companytwoAddress, contactInfo, state):
    if state.get_companytwo(companytwoId) is not None:
        raise InvalidTransaction(
            'Invalid action: Companytwo already exists: {}'.format(companytwoId))

    state.set_companytwo(companytwoId, companytwoName, companytwoAddress, contactInfo)