# Haul State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


HAUL_NAMESPACE = hashlib.sha512(
    'haul'.encode('utf-8')).hexdigest()[0:6]


def _get_address(launchDateTime):
    adr = hashlib.sha512(str(launchDateTime).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_haul_address(launchDateTime):
    add =  HAUL_NAMESPACE + '00' + _get_address(launchDateTime)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class HaulState(object):

    TIMEOUT = 3

    def __init__(self, context):
        LOGGER.info("Haul State is initalised")
        self._context = context

    def get_haul(self, launchDateTime):
        return self._get_state(_get_haul_address(launchDateTime))


    def set_haul(self, launchDateTime, launchPosition, launchLatitude, launchLongitude, haulDateTime, haulPosition, haulLatitude, haulLongitude, pkTrip):
        address = _get_haul_address(launchDateTime)
        LOGGER.info('set_haul method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "launchDateTime": launchDateTime,
                "launchPosition": launchPosition,
                "launchLatitude": launchLatitude,
                "launchLongitude": launchLongitude,
                "haulDateTime": haulDateTime,
                "haulPosition": haulPosition,
                "haulLatitude": haulLatitude,
                "haulLongitude": haulLongitude,
                "pkTrip": pkTrip
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
