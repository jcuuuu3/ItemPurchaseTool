import {LightningElement, api} from 'lwc';
import ItemDetailsModal from 'c/itemDetailsModal';


export default class ItemTile extends LightningElement {
    @api itemData;
    @api cart;

    handleAddToCart() {
        this.dispatchEvent(new CustomEvent('productadd', {
            detail: this.itemData,
        }));
    }

    async handleViewDetails() {
        const result = await ItemDetailsModal.open({
            size: 'small',
            product: this.itemData
        });
    }


}