# Haul Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.haul.payload import HaulPayload
from tunachain_processor.haul.state import HaulState
from tunachain_processor.haul.state import HAUL_NAMESPACE


LOGGER = logging.getLogger(__name__)


class HaulTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'haul'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [HAUL_NAMESPACE]

    def apply(self, transaction, context):
        LOGGER.info('Starting handler method at Haul Processor')
        header = transaction.header
        signer = header.signer_public_key

        payload = HaulPayload(transaction.payload)
        state = HaulState(context)

        LOGGER.info('Company handler apply method')
        LOGGER.info(payload)
        
        _create_haul(launchDateTime=payload.launchDateTime,
                     launchPosition=payload.launchPosition,
                     launchLatitude=payload.launchLatitude,
                     launchLongitude=payload.launchLongitude,
                     haulDateTime=payload.haulDateTime,
                     haulPosition=payload.haulPosition,
                     haulLatitude=payload.haulLatitude,
                     haulLongitude=payload.haulLongitude,
                     pkTrip=payload.pkTrip,
                     state=state)


def _create_haul(launchDateTime, launchPosition, launchLatitude, launchLongitude, haulDateTime, haulPosition, haulLatitude, haulLongitude, pkTrip, state):
    if state.get_haul(launchDateTime) is not None:
        raise InvalidTransaction(
            'Invalid action: Haul already exists: {}'.format(launchDateTime))

    state.set_haul(launchDateTime, launchPosition, launchLatitude, launchLongitude, haulDateTime, haulPosition, haulLatitude, haulLongitude, pkTrip)
