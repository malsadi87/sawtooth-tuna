# Company Transaction Handler
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

from itertools import product
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.company.payload import CompanyPayload
from tunachain_processor.company.state import CompanyState
from tunachain_processor.company.state import COMPANY_NAMESPACE


LOGGER = logging.getLogger(__name__)


class CompanyTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'company'

    @property
    def family_versions(self):
        return ['0.1']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [COMPANY_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = CompanyPayload(transaction.payload)
        state = CompanyState(context)

        LOGGER.info('Company handler apply method')
        LOGGER.info(payload)

        
        _create_company(companyId=payload.companyId,
                        companyName=payload.companyName,
                        companyAddress=payload.companyAddress,
                        contactInfo=payload.contactInfo,
                        state=state)


def _create_company(companyId, companyName, companyAddress, contactInfo, state):
    if state.get_company(companyId) is not None:
        raise InvalidTransaction(
            'Invalid action: Company already exists: {}'.format(companyId))

    state.set_company(companyId, companyName, companyAddress, contactInfo)