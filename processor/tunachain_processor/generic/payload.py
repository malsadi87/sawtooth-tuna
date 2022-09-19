# Payload for Generic Entity
#
# Written by Amjad
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class GenericEntityPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
            LOGGER.info(data)
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")

        entity_type = data.get('entity_type')
        identifier = data.get('identifier')
        data_hash = data.get('data_hash')

        if not entity_type:
            raise InvalidTransaction('entity_type No is required')

        if not identifier:
            raise InvalidTransaction('identifier is required')

        if not data_hash:
            raise InvalidTransaction('data_hash is required')

        self._entity_type = entity_type
        self._identifier = identifier
        self._data_hash = data_hash

    @property
    def entity_type(self):
        return self._entity_type

    @property
    def identifier(self):
        return self._identifier

    @property
    def data_hash(self):
        return self._data_hash 