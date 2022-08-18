# Speciess Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.speciess.payload import SpeciessPayload
from tunachain_processor.speciess.state import SpeciessState
from tunachain_processor.speciess.state import SPECIESS_NAMESPACE


LOGGER = logging.getLogger(__name__)


class SpeciessTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'speciess'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [SPECIESS_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = SpeciessPayload(transaction.payload)
        state = SpeciessState(context)

        LOGGER.info('Speciess handler apply method')
        LOGGER.info(payload)

        
        _create_speciess(speciessId=payload.speciessId,
                    quantity=payload.quantity,
                    species=payload.species,
                    packageNum=payload.packageNum,
                    launchDateTime=payload.launchDateTime,
                    state=state)


def _create_speciess(speciessId, quantity, species, packageNum, launchDateTime, state):
    if state.get_speciess(speciessId) is not None:
        raise InvalidTransaction(
            'Invalid action: Speciess already exists: {}'.format(speciessId))

    state.set_speciess(speciessId, quantity, species, packageNum, launchDateTime)