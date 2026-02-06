import { LightningElement, wire, track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAccountInfo from '@salesforce/apex/MainPageController.getAccountInfo';
import CreateItemModal from "c/createItemModal";
import CartModal from 'c/cartModal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import IS_MANAGER from '@salesforce/schema/User.IsManager__c';

export default class ItemPurchaseTool extends LightningElement {
    @track recordId;
    @track accountName;
    accountNumber;
    accountIndustry;
    @track filterType;
    @track filterFamily;
    @track searchKey;
    @track cart = [];
    @track cartSize;
    @track createItemUpdate = 0;
    isManager;

    connectedCallback() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }

    relay(event){
        this.cartSize = event.detail;
    }

    @wire(getRecord, { recordId: USER_ID, fields: [IS_MANAGER] })
    wiredUser({ error, data }) {
        if (data) {
            this.isManager = getFieldValue(data, IS_MANAGER);
            console.log('Success! isManager is:', this.isManager);
        } else if (error) {
            console.error('Actual Wire Error:', error);
        }
    }

    @wire(CurrentPageReference)
    getStateParameters(pageRef) {
        if (pageRef) {
            this.recordId = pageRef.state.c__recordId;
        }
    }

    @wire(getAccountInfo, { 'accId' : '$recordId' })
    wiredAccount({ error, data }) {
        if (data) {
            [this.accountName, this.accountIndustry, this.accountNumber] = data;
        } else if (error) {
            this.accountName = "Error";
            console.error('Error fetching account info', error);
        }
    }

    async handleCreateItemClick() {
        const result = await CreateItemModal.open({
            size: 'medium',
            description: 'Modal to create a new Item__c record'
        });
        this.createItemUpdate++;
    }

    handleSearchChange(event){
        this.searchKey = event.detail.value;
    }

    handleFilterUpdate(event) {
        this.filterType = event.detail.TYPE;
        this.filterFamily = event.detail.FAMILY;
    }

    handleAddToCart(event) {
        const newItem = event.detail;

        const index = this.cart.findIndex(item => item.Id === newItem.Id);

        if (index !== -1) {
            let tempCart = [...this.cart];
            tempCart[index].quantity += 1;
            tempCart[index].totalPrice += tempCart[index].Price__c;
            this.cart = tempCart;
        } else {
            this.cart = [...this.cart, { ...newItem, quantity: 1, totalPrice: newItem.Price__c}];
        }

        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));

        const r = new ShowToastEvent({
            title: 'Success!',
            message: 'Your item was added to the cart.',
            variant: 'success',
            mode: 'dismissible'
        });
        this.dispatchEvent(r);
    }

    async handleOpenCart() {
        const result = await CartModal.open({
            size: 'medium',
            description: 'Shopping Cart View',
            cartItems: this.cart,
            accName: this.accountName,
            accNumber: this.recordId
        });

        if (result === 'checkout') {
            console.log('User wants to checkout!');
        }
    }
}