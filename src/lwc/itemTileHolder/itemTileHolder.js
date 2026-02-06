import { LightningElement, track, wire, api} from 'lwc';
import getAllItems from '@salesforce/apex/ItemsController.getAllItems';
export default class ItemTileHolder extends LightningElement {
    @track childItems;
    @api filterType;
    @api filterFamily;
    @api searchKey;
    @api cartContent;
    @api tt;

    @wire(getAllItems, { type: '$filterType', family: '$filterFamily', search: '$searchKey', tt: '$tt'})
    getAllItems({ error, data }) {
        if (data) {
            this.childItems = data;
            this.dispatchEvent(new CustomEvent('itemcountchange', {
                detail: data.length,
            }));
        } else if (error) {
            console.error('Error fetching items', error);
        }

    }

    handleRelay(event) {
        this.dispatchEvent(new CustomEvent('productadd', {
            detail: event.detail,
        }));
    }

}