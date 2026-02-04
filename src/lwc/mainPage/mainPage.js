import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAccountInfo from '@salesforce/apex/MainPageController.getAccountInfo';

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
}