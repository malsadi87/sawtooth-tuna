# Catch Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.catch.payload import CatchPayload
from tunachain_processor.catch.state import CatchState
from tunachain_processor.catch.state import PACKAGE_NAMESPACE


LOGGER = logging.getLogger(__name__)


class CatchTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'catch'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [PACKAGE_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = CatchPayload(transaction.payload)
        state = CatchState(context)

        LOGGER.info('Catch handler apply method')
        LOGGER.info(payload)

       
        _create_package(pkCatch=payload.pkCatch,
                        updatedDateTime=payload.updatedDateTime,
                        palletNum=payload.palletNum,
                        state=state)


def _create_package(pkCatch, updatedDateTime, palletNum , state):
    if state.get_package(pkCatch) is not None:
        raise InvalidTransaction(
            'Invalid action: Package already exists: {}'.format(pkCatch))

    state.set_package(pkCatch, updatedDateTime, palletNum )
