import LightningModal from 'lightning/modal';

export default class CreateItemModal extends LightningModal {
    handleCancel() {
        this.close();
    }

    triggerSubmit() {
        const btn = this.template.querySelector('[data-id="submit-btn"]');
        if (btn) btn.click();
    }

    handleSuccess() {
        this.close();
    }

    handleError(event) {
        console.error('Error creating record: ', JSON.stringify(event.detail));
    }
}