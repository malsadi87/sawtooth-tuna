# Trip Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.trip.payload import TripPayload
from tunachain_processor.trip.state import TripState
from tunachain_processor.trip.state import TRIP_NAMESPACE


LOGGER = logging.getLogger(__name__)


class TripTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'trip'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [TRIP_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = TripPayload(transaction.payload)
        state = TripState(context)

        LOGGER.info('Trip handler apply method')
        LOGGER.info(payload)
        
        _create_trip(pkTrip=payload.pkTrip,
                        tripWithinYearNo=payload.tripWithinYearNo,
                        vesselName=payload.vesselName,
                        departureDate=payload.departureDate,
                        departurePort=payload.departurePort,
                        landingDate=payload.landingDate,
                        landingPort=payload.landingPort,
                        state=state)


def _create_trip(pkTrip, tripWithinYearNo, vesselName, departureDate, departurePort, landingDate, landingPort, state):
    if state.get_trip(pkTrip) is not None:
        raise InvalidTransaction(
            'Invalid action: trip already exists: {}'.format(pkTrip))

    state.set_trip(pkTrip, tripWithinYearNo, vesselName, departureDate, departurePort, landingDate, landingPort)
