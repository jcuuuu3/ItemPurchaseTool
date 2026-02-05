import { LightningElement, track, wire, api} from 'lwc';
import getAllItems from '@salesforce/apex/ItemsController.getAllItems';
export default class ItemTileHolder extends LightningElement {
    @track childItems;
    @api filterType;
    @api filterFamily;

    @wire(getAllItems, { type: '$filterType', family: '$filterFamily' })
    getAllItems({ error, data }) {
        if (data) {
            this.childItems = data;
        } else if (error) {
            console.error('Error fetching items', error);
        }
    }

}