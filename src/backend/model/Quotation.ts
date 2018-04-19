import { QuotationBase } from './base/QuotationBase';

export class Quotation extends QuotationBase {
    id: number;

    getDuplicateQuotation(duplicateQuotation, quotation) {
        duplicateQuotation.label = quotation.label;
        duplicateQuotation.codeQuotation = quotation.codeQuotation;
        duplicateQuotation.enabledCgv = quotation.enabledCgv;
        duplicateQuotation.customerNotes = quotation.customerNotes;
        duplicateQuotation.privateNotes = quotation.privateNotes;
        duplicateQuotation.setContact(quotation.contact.id);
        duplicateQuotation.setCustomer(quotation.customer.id);

        if (quotation.paymentConditions) {
            duplicateQuotation.setPaymentConditions(quotation.paymentConditions.id);
        }
        if (quotation.provision) {
            duplicateQuotation.setProvision(quotation.provision.id);
        }
        if (quotation.status) {
            duplicateQuotation.setStatus(quotation.status.id);
        }

        return duplicateQuotation;
    }
}
