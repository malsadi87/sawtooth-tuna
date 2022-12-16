# Pallet Pallet_Event
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


PALLET_EVENT_NAMESPACE = hashlib.sha512(
    'pallet-event'.encode('utf-8')).hexdigest()[0:6]


def _get_address(event):
    adr = hashlib.sha512(str(event).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_event_address(pkPallet, eventTime):
    identifier = pkPallet + eventTime
    add =  PALLET_EVENT_NAMESPACE + '00' + _get_address(identifier)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class PalletEventState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_pallet_event(self, pkPallet, eventTime):
        return self._get_state(_get_event_address(pkPallet, eventTime))

    
    def set_pallet_event(self, pkPallet, eventTime, temperature, location, tilt, shock):
        address = _get_event_address(pkPallet, eventTime)
        LOGGER.info('set_pallet_event method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "pkPallet": pkPallet,
                "eventTime": eventTime,
                "temperature": temperature,
                "location": location,
                "tilt": tilt,
                "shock": shock

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
