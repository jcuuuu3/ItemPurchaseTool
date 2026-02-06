import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import processCart from '@salesforce/apex/CartController.processCart';
import { NavigationMixin } from 'lightning/navigation';

export default class CartModal extends NavigationMixin(LightningModal) {
    @api cartItems;
    @api accName;
    @api accNumber;

    get grandTotal() {
        return this.cartItems.reduce((total, item) => total + (item.Price__c * item.quantity), 0).toFixed(2);
    }

    handleClose() {
        this.close();
    }

    handleCheckout() {
        const cart = this.cartItems.map(item => {
            const { Price__c, ...others } = item;
            return {
                ...others,
                Price: Price__c
            };
        });

        processCart({items : cart, accountId : this.accNumber, accountName : this.accName});

        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Purchase_List'
            }
        });

        this.close();
    }
}