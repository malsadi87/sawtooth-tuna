# Metadata State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


METADATA_NAMESPACE = hashlib.sha512(
    'cross-chain'.encode('utf-8')).hexdigest()[0:6]


def _get_address(key):
    adr = hashlib.sha512(key.encode('utf-8')).hexdigest()[:62]
    LOGGER.info('_get_address')
    LOGGER.info(adr)
    return adr


def _get_metadata_address(key):
    add =  METADATA_NAMESPACE + '00' + _get_address(key)
    LOGGER.info('_get_metadata_address')
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class MetadataState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_metadata(self, key):
        return self._get_state(_get_metadata_address(key))


    def set_metadata(self, key, value):
        address = _get_metadata_address(key)
        LOGGER.info('set_metadata method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "key": key,
                "value": value
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
