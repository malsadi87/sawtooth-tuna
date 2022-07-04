# CatchPackage Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.catch_package.payload import CatchPackagePayload
from tunachain_processor.catch_package.state import CatchPackageState
from tunachain_processor.catch_package.state import PACKAGE_NAMESPACE


LOGGER = logging.getLogger(__name__)


class CatchPackageTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'catch-package'

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

        payload = CatchPackagePayload(transaction.payload)
        state = CatchPackageState(context)

        LOGGER.info('CatchPackage handler apply method')
        LOGGER.info(payload)

       
        _create_package(catchPackageId=payload.catchPackageId,
                        packingDate=payload.packingDate,
                        palletNum=payload.palletNum,
                        state=state)


def _create_package(catchPackageId, packingDate, palletNum , state):
    if state.get_package(catchPackageId) is not None:
        raise InvalidTransaction(
            'Invalid action: Package already exists: {}'.format(catchPackageId))

    state.set_package(catchPackageId, packingDate, palletNum )
