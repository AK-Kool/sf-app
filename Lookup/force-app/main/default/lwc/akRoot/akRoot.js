import { LightningElement, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactCtrl.getContacts';

//const TABS = [`All`, `Company`, `Industries and Contacts`];
const TABS = [`A`, `B`, `C`, `D`];

export default class AkRoot extends LightningElement {
    @track searchResults;
    @track tabs = TABS;

    async connectedCallback() {
        const result = await getContacts({ searchText: '' });
        this.searchResults = result;
    }
}
