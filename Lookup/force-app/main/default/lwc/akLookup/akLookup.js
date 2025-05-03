import { api, LightningElement, track } from 'lwc';

export default class AkLookup extends LightningElement {
    // private variables
    _activeTab = `All`;
    _isComponentRendered = false;

    @track results;

    @api
    set searchResults(value) {
        this.results = value;
    }

    get searchResults() {
        return this.results;
    }

    handleTabClick(e) {
        //alert(JSON.stringify(e.target.innerText));
    }

    renderedCallback() {
        if (!this._isComponentRendered) {
            this.template.querySelectorAll(`.tab-span`).forEach((row) => {
                if (row.innerText === `All`) row.classList.toggle(`active`);
            });
            this._isComponentRendered = true;
        }
    }
}
