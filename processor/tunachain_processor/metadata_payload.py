# Payload for metadata
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class MetadataPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)
        key = data.get('key')
        LOGGER.info(key)
        value = data.get('value')
        LOGGER.info(value)

        if not key:
            raise InvalidTransaction('Key is required')
        
        self._key = key
        self._value = value
       
    @property
    def key(self):
        return self._key
    
    @property
    def value(self):
        return self._value
