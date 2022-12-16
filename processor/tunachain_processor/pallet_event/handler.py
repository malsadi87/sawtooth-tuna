# Pallet-Event Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.pallet_event.payload import PalletEventPayload
from tunachain_processor.pallet_event.state import PalletEventState
from tunachain_processor.pallet_event.state import PALLET_EVENT_NAMESPACE


LOGGER = logging.getLogger(__name__)


class PalletEventTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'pallet-event'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [PALLET_EVENT_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = PalletEventPayload(transaction.payload)
        state = PalletEventState(context)

        LOGGER.info('Pallet-Event handler apply method')
        LOGGER.info(payload)

        
        _create_pallet_event(pkPallet=payload.pkPallet,
                        eventTime=payload.eventTime,
                        temperature=payload.temperature,
                        location=payload.location,
                        tilt=payload.tilt,
                        shock=payload.shock,
                        state=state)


def _create_pallet_event(pkPallet, eventTime, temperature, location, tilt, shock, state):
    if state.get_pallet_event(pkPallet, eventTime) is not None:
        raise InvalidTransaction(
            'Invalid action: Event already exists: {}'.format(pkPallet))

    state.set_pallet_event(pkPallet, eventTime, temperature, location, tilt, shock)
