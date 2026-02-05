import { LightningElement, track, wire} from 'lwc';
import getAllItems from '@salesforce/apex/ItemsController.getAllItems';
export default class ItemTileHolder extends LightningElement {
    @track childItems;

    @wire(getAllItems)
    getAllItems({ error, data }) {
        if (data) {
            this.childItems = data;
        } else if (error) {
            console.error('Error fetching items', error);
        }
    }

}