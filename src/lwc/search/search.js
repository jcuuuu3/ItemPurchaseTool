import { LightningElement, track } from 'lwc';

export default class SearchComponent extends LightningElement {
    @track searchKey = '';
    delayTimeout;

    connectedCallback() {
        this.dispatchEvent(new CustomEvent('searchchange', {
            detail: { value: this.searchKey }
        }));
    }

    handleSearchChange(event) {

        window.clearTimeout(this.delayTimeout);

        const searchValue = event.target.value;


        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchValue;


            const searchEvent = new CustomEvent('searchchange', {
                detail: { value: this.searchKey }
            });
            this.dispatchEvent(searchEvent);
        }, 300);
    }
}