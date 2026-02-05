import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class CartModal extends LightningModal {
    @api cartItems;

    get grandTotal() {
        return this.cartItems.reduce((total, item) => total + (item.Price__c * item.quantity), 0).toFixed(2);
    }

    handleClose() {
        this.close();
    }

    handleCheckout() {
        this.close();
    }
}