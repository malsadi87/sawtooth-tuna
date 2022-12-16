# Pallet Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.pallet.payload import PalletPayload
from tunachain_processor.pallet.state import PalletState
from tunachain_processor.pallet.state import PALLET_NAMESPACE


LOGGER = logging.getLogger(__name__)


class PalletTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'pallet'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [PALLET_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = PalletPayload(transaction.payload)
        state = PalletState(context)

        LOGGER.info('Pallet handler apply method')
        LOGGER.info(payload)

        
        _create_pallet(pkPallet=payload.pkPallet,
                        palletId=payload.palletId,
                        fkCompany=payload.fkCompany,
                        quantity=payload.quantity,
                        pkTrip=payload.pkTrip,
                        state=state)


def _create_pallet(pkPallet, palletId, fkCompany, quantity, pkTrip, state):
    if state.get_pallet(pkPallet) is not None:
        raise InvalidTransaction(
            'Invalid action: Pallet already exists: {}'.format(pkPallet))

    state.set_pallet(pkPallet, palletId, fkCompany, quantity, pkTrip)
