# Copyright 2018 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class TunachainPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)
        action = data.get('action')
        #add fish ID
        fishID = data.get('fishID')
        asset = data.get('asset')
        owner = data.get('owner')
        #New fields
        quantity = data.get('quantity')
        location = data.get('location')

        if not action:
            raise InvalidTransaction('Action is required')
        if action not in ('create', 'transfer', 'accept', 'reject'):
            raise InvalidTransaction('Invalid action: {}'.format(action))

        if not asset:
            raise InvalidTransaction('Asset is required')

        if action == 'transfer':
            if not owner:
                raise InvalidTransaction(
                    'Owner is required for "transfer" transaction')

        self._action = action
         #new fields
        self._fishID = fishID
        self._asset = asset
        self._owner = owner
        #new fields
        self._quantity = quantity
        self._location = location

    @property
    def action(self):
        return self._action
    
    @property
    def fishID(self):
        return self._fishID

    @property
    def asset(self):
        return self._asset

    @property
    def owner(self):
        return self._owner

    @property
    def quantity(self):
        return self._quantity

    @property
    def location(self):
        return self._location
