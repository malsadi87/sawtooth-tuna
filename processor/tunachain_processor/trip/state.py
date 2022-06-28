# Trip State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


TRIP_NAMESPACE = hashlib.sha512(
    'trip'.encode('utf-8')).hexdigest()[0:6]


def _get_address(tripNo):
    adr = hashlib.sha512(tripNo.encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_trip_address(tripNo):
    add =  TRIP_NAMESPACE + '00' + _get_address(tripNo)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class TripState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_trip(self, tripNo):
        return self._get_state(_get_trip_address(tripNo))


    def set_trip(self, tripNo, tripWithinYearNo, vesselName, departureDate, departurePort, landingDate, landingPort):
        address = _get_trip_address(tripNo)
        LOGGER.info('set_trip method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "tripNo": tripNo,
                "tripWithinYearNo": tripWithinYearNo,
                "vesselName": vesselName,
                "departureDate": departureDate,
                "departurePort": departurePort,
                "landingDate": landingDate,
                "landingPort": landingPort

            })
        return self._context.set_state(
            {address: state_data}, timeout=self.TIMEOUT)

    def _get_state(self, address):
        state_entries = self._context.get_state(
            [address], timeout=self.TIMEOUT)
        if state_entries:
            entry = _deserialize(data=state_entries[0].data)
        else:
            entry = None
        return entry
