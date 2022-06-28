# Species Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.species.payload import SpeciesPayload
from tunachain_processor.species.state import SpeciesState
from tunachain_processor.species.state import SPECIES_NAMESPACE


LOGGER = logging.getLogger(__name__)


class SpeciesTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'species'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [SPECIES_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = SpeciesPayload(transaction.payload)
        state = SpeciesState(context)

        LOGGER.info('Species handler apply method')
        LOGGER.info(payload)
        
        _create_species(speciesId=payload.speciesId,
                        quantity=payload.quantity,
                        species=payload.species,
                        packageNum=payload.packageNum,
                        launchDateTime=payload.launchDateTime,
                        state=state)


def _create_species(speciesId, quantity, species, packageNum, launchDateTime, state):
    if state.get_species(speciesId) is not None:
        raise InvalidTransaction(
            'Invalid action: Species already exists: {}'.format(speciesId))

    state.set_species(speciesId, quantity, species, packageNum, launchDateTime)
