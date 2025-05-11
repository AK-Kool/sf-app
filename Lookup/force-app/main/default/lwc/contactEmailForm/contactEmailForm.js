import { LightningElement, track } from 'lwc';

export default class ContactEmailForm extends LightningElement {
    @track emailList = [];
    _hasNotErrors = true;
    @track options = [
        { label: 'Corporate', value: 'Corporate' },
        { label: 'Bloomberg', value: 'Bloomberg' },
        { label: 'Personal', value: 'Personal' },
        { label: 'Group', value: 'Group' },
        { label: 'Other', value: 'Other' }
    ];
    @track groupWhiteList = [
        'group',
        'loans',
        'team'
    ];
    @track groupFuzzyWhiteList = [
        'research',
        'coo',
        'gg'
    ];

    handleComboboxChange(event) {
        let changedEmail = this.emailList.find(row => row.id === parseInt(event.target.dataset.rowId, 10));
        changedEmail.type = event?.detail?.value?.trim();
        this.validateEmails();
        this.validateEmailTypes();
    }

    handleInputChange(event) {
        let changedEmail = this.emailList.find(row => row.id === parseInt(event.target.dataset.rowId, 10));
        changedEmail.email = event?.detail?.value?.trim();
        this.validateEmails();
        this.validateEmailTypes();
    }

    handleDeleteClick(event) {
        this.emailList = this.emailList.filter(row => row.id !== parseInt(event.target.dataset.rowId, 10));
        this.updateEmailList(this.emailList);
    }

    handleNewEmailAddress() {
        this.emailList.push({
            id: this.emailList.length + 1,
            disabled: false
        });
        this.updateEmailList(this.emailList);
    }

    updateEmailList(emailList) {
        if(emailList.length === 1) {
            this.emailList[0].disabled = true;
            this.emailList[0].id = 1;
        } else if (emailList.length > 1) {
            this.emailList.forEach((row, index) => {
                row.disabled = false;
                row.id = index + 1;
            });
        }
    }

    validateEmails() {
        const emailList = this.template.querySelectorAll('lightning-input');
        emailList.forEach(email => {
            if(email.value.trim() === '') {
                email.setCustomValidity('Please enter email address');
                email.reportValidity();
                this._hasNotErrors = false;
            } else {
                email.setCustomValidity('');
                this._hasNotErrors = true;
            }
        });
    }

    validateEmailTypes() {
        const emailList = this.template.querySelectorAll('lightning-combobox');
        emailList.forEach(email => {
            if(email.value.trim() === '') {
                email.setCustomValidity('Please select appropriate type');
                email.reportValidity();
                this._hasNotErrors = false;
            } else {
                email.setCustomValidity('');
                this._hasNotErrors = true;
            }
        });
    }

    handleBlur(event) {
        let comboboxElement = this.template.querySelector(`lightning-combobox[data-row-id="${event.target.dataset.rowId}"]`);
        let emailLocalPart = event.target.value.split('@')[0];
        if(this.groupWhiteList.includes(emailLocalPart) || this.groupFuzzyWhiteList.some(group => emailLocalPart.includes(group))) {
            comboboxElement.value = 'Group';
            this._hasNotErrors = true;
        } else {
            if(emailLocalPart.trim() !== '') {
                comboboxElement.setCustomValidity('Please select appropriate type');
                comboboxElement.reportValidity();
                comboboxElement.value = '';
                this._hasNotErrors = false;
            }
        }
    }

    get isButtonDisabled() {
        return this.emailList.length === 0 ? false : this._hasNotErrors;
    }
}