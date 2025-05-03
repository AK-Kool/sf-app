import { api, LightningElement, track } from 'lwc';

export default class AkLookup extends LightningElement {
    // private variables
    _activeTab;
    _isComponentRendered = false;
    _tabs;
    _cancelBlur = false;

    @track results;

    @api
    set searchResults(value) {
        this.results = value;
    }

    get searchResults() {
        return this.results;
    }

    @api
    set tabs(value) {
        this._tabs = value;
        this._activeTab = this._tabs[0];
    }

    get tabs() {
        return this._tabs;
    }

    handleTabClick(e) {
        this._cancelBlur = true;
        if (e.target.innerText !== this._activeTab) {
            this.template.querySelectorAll(`.tab-span`).forEach((row) => {
                if (row.innerText === this._activeTab || row.innerText === e.target.innerText) row.classList.toggle(`active`);
            });
            this._activeTab = e.target.innerText;
        }
    }

    renderedCallback() {
        if (!this._isComponentRendered && this._activeTab) {
            this.template.querySelectorAll(`.tab-span`).forEach((row) => {
                if (row.innerText === this._activeTab) row.classList.toggle(`active`);
            });
            this._isComponentRendered = true;
        }
    }

    // input events
    handleInputBlur(e) {
        if (this._cancelBlur) return;
        const element = this.template.querySelector(`.slds-combobox`);
        if (element) {
            this.toggleCss(element, `slds-is-open`, false);
        }
    }

    handleInput(e) {
        const element = this.template.querySelector(`.slds-combobox`);
        if (element) {
            this.toggleCss(element, `slds-is-open`, true);
        }
    }

    handleInputClick(e) {
        const element = this.template.querySelector(`.slds-combobox`);
        if (element) {
            this.toggleCss(element, `slds-is-open`, true);
        }
    }

    toggleCss(element, cssClass, toggleValue) {
        element.classList.toggle(cssClass, toggleValue);
    }

    handleMouseClick(e) {
        if (e.type === `mousedown` && e.button === 0) {
            this._cancelBlur = true;
        }
    }

    handleRowClick(e) {
        // alert(e.currentTarget.dataset.rowid);
        this._cancelBlur = false;
        const element = this.template.querySelector(`.slds-combobox`);
        if (element) {
            this.toggleCss(element, `slds-is-open`, false);
        }
    }
}
