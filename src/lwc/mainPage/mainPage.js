import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAccountInfo from '@salesforce/apex/MainPageController.getAccountInfo';
import CreateItemModal from "c/createItemModal";

export default class ItemPurchaseTool extends LightningElement {
    recordId;
    accountName;
    accountNumber;
    accountIndustry;

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
    }
}