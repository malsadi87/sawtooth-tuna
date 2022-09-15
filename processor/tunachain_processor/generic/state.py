# Generic Entity State
#
# Written by Amjad
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)

# Any way to make it dynamic
GENERIC_ENTITY_NAMESPACE = hashlib.sha512(
    'generic'.encode('utf-8')).hexdigest()[0:6]

def _get_entity_type_address(entity_type):
    adr =  hashlib.sha512(str(entity_type).encode('utf-8')).hexdigest()[0:6]
    LOGGER.info('Generic entity type address')
    LOGGER.info(adr)
    return adr

def _get_identifier_address(identifier):
    adr = hashlib.sha512(str(identifier).encode('utf-8')).hexdigest()[:62]
    LOGGER.info('Generic entity identifier address')
    LOGGER.info(adr)
    return adr

def _get_generic_entity_address(entity_type, identifier):
    add =  GENERIC_ENTITY_NAMESPACE + '00' + _get_entity_type_address(entity_type) + '00' + _get_identifier_address(identifier)
    logging.info('Final address for the generic entity')
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')

class GenericEntityState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_generic_entity(self, entity_type, identifier):
        return self._get_state(_get_generic_entity_address(entity_type, identifier))

    def set_generic_entity(self, entity_type, identifier, data_hash):
        address = _get_generic_entity_address(entity_type, identifier)
        LOGGER.info('set_generic_entity method')
        LOGGER.info(address)

        state_data = _serialize(
            {   "entity_type": entity_type,
                "identifier": identifier,
                "data_hash": data_hash
            })
        return self._context.set_state({address: state_data}, timeout=self.TIMEOUT)

    def _get_state(self, address):
        state_entries = self._context.get_state(
            [address], timeout=self.TIMEOUT)
        if state_entries:
            entry = _deserialize(data=state_entries[0].data)
        else:
            entry = None
        return entry

