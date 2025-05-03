import { api, LightningElement, track } from 'lwc';

export default class AkLookup extends LightningElement {
    // private variables
    _activeTab;
    _isComponentRendered = false;
    _tabs;
    _cancelBlur = false;
    _searchKey = ``;
    _debounceTimeout;

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
        if (e.target.innerText !== this._activeTab) {
            this.template.querySelectorAll(`.tab-span`).forEach((row) => {
                if (row.innerText === this._activeTab || row.innerText === e.target.innerText) row.classList.toggle(`active`);
            });
            this._activeTab = e.target.innerText;

            this.dispatchEvent(new CustomEvent('tabchange', { detail: this._activeTab }));
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
        clearTimeout(this._debounceTimeout);
        this._searchKey = e.target.value;
        this._debounceTimeout = setTimeout(() => {
            const element = this.template.querySelector(`.slds-combobox`);
            if (element) {
                this.toggleCss(element, `slds-is-open`, true);
            }

            this.dispatchEvent(new CustomEvent('search', { detail: this._searchKey }));
        }, 300);
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
        } else if (e.type === `mouseup` && e.button === 0) {
            const inputEle = this.template.querySelector(`.slds-combobox__input`);
            if (inputEle) {
                inputEle.focus();
            }
            this._cancelBlur = false;
        }
    }

    handleRowClick(e) {
        // alert(e.currentTarget.dataset.rowid);
        this._cancelBlur = false;
        const element = this.template.querySelector(`.slds-combobox`);
        if (element) {
            this.toggleCss(element, `slds-is-open`, false);
        }
        const inputEle = this.template.querySelector(`.slds-combobox__input`);
        if (inputEle) {
            inputEle.blur();
        }
    }

    disconnectedCallback() {
        clearTimeout(this._debounceTimeout);
    }
}
