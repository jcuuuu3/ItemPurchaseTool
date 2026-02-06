import { LightningElement, api} from 'lwc';

export default class Filters extends LightningElement {
    filterOne = '';
    filterTwo = '';
    @api itemCount;

    get optionsOne() {
        return [
            { label: 'Food', value: 'Food' },
            { label: 'Clothes', value: 'Clothes' },
            { label: 'Car', value: 'Car' },
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Any', value: '' }
        ];
    }

    get optionsTwo() {
        return [
            { label: 'Best Seller', value: 'Best Seller' },
            { label: 'Exclusive', value: 'Exclusive' },
            { label: 'Newcoming', value: 'Newcoming' },
            { label: 'Economical', value: 'Economical' },
            { label: 'Any', value: '' }
        ];
    }

    connectedCallback() {
        this.dispatchEvent(new CustomEvent('filterchange', {
            detail: {
                TYPE: this.filterOne,
                FAMILY: this.filterTwo
            }
        }));
    }

    handleFilterChange(event) {
        const field = event.target.dataset.id;
        if (field === 'filter1') this.filterOne = event.detail.value;
        if (field === 'filter2') this.filterTwo = event.detail.value;

        const filterEvent = new CustomEvent('filterchange', {
            detail: {
                TYPE: this.filterOne,
                FAMILY: this.filterTwo
            }
        });

        this.dispatchEvent(filterEvent);
    }
}