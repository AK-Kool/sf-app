import { LightningElement, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactCtrl.getContacts';

export default class AkRoot extends LightningElement {
    @track searchResults;
    async connectedCallback() {
        const result = await getContacts({ searchText: '' });
        this.searchResults = result;
    }
}
