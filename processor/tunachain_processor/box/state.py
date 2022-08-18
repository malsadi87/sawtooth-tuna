# Box State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


COMPANY_NAMESPACE = hashlib.sha512(
    'box'.encode('utf-8')).hexdigest()[0:6]
LOGGER.info(COMPANY_NAMESPACE)    


def _get_address(boxId):
    adr = hashlib.sha512(boxId.encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_box_address(boxId):
    add =  COMPANY_NAMESPACE + '00' + _get_address(boxId)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class BoxState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_box(self, boxId):
        return self._get_state(_get_box_address(boxId))

    
    def set_box(self, boxId):
        address = _get_box_address(boxId)
        LOGGER.info('set_box method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "boxId": boxId
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
