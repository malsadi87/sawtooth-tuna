# ConsumerPackage Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.custom_package.payload import ConsumerPackagePayload
from tunachain_processor.custom_package.state import ConsumerPackageState
from tunachain_processor.custom_package.state import CUSTOM_PACKAGE_NAMESPACE


LOGGER = logging.getLogger(__name__)


class ConsumerPackageTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'custom-package'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [CUSTOM_PACKAGE_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = ConsumerPackagePayload(transaction.payload)
        state = ConsumerPackageState(context)

        LOGGER.info('ConsumerPackage handler apply method')
        LOGGER.info(payload)

       
        _create_custom_package(pkConsumerPackage=payload.pkConsumerPackage,
                        fkPallet=payload.fkPallet,
                        packingDateTime=payload.packingDateTime,
                        agent=payload.agent,
                        state=state)


def _create_custom_package(pkConsumerPackage, fkPallet, packingDateTime, agent , state):
    if state.get_custom_package(pkConsumerPackage) is not None:
        raise InvalidTransaction(
            'Invalid action: Consumer Package already exists: {}'.format(pkConsumerPackage))

    state.set_custom_package(pkConsumerPackage, fkPallet, packingDateTime, agent )
