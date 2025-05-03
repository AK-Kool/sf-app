"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lwc_1 = require("lwc");
class ContacEditEmailForm extends lwc_1.LightningElement {
    value = ``;
    get options() {
        return [
            { label: 'Bloomberg', value: 'Bloomberg' },
            { label: 'Corporate', value: 'Corporate' },
            { label: 'Group', value: 'Group' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Other', value: 'Other' }
        ];
    }
    handleChange(event) {
        const target = event.target;
        this.value = target.value;
    }
}
exports.default = ContacEditEmailForm;
