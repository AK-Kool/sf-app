import { LightningElement, wire } from "lwc";
import getContactsForLwc from "@salesforce/apex/ContactController.getContactsForLwc";

const columns = [
  {
    label: "First Name",
    fieldName: "FirstNameURL",
    type: "url",
    typeAttributes: {
      label: { fieldName: "FirstName" },
      target: "_blank",
      tooltip: { fieldName: "FirstName" }
    }
  },
  {
    label: "Last Name",
    fieldName: "LastName",
    type: "text",
    cellAttributes: {
      class: "slds-text-color_success slds-text-title_caps"
    },
    typeAttributes: {
      tooltip: { fieldName: "LastName" }
    }
  },
  {
    type: "button",
    typeAttributes: {
      label: "View",
      name: "view",
      variant: "base"
    }
  }
];

export default class RootCmp extends LightningElement {
  columns = columns;
  data;

  @wire(getContactsForLwc)
  wiredCallback({ data, error }) {
    if (data) {
      this.data = data.map((row) => {
        return {
          ...row,
          FirstNameURL: `/${row.Id}`
        };
      });
    } else if (error) {
      console.error("error");
    }
  }

  handleRowAction(event) {
    const recordId = event.detail.row.Id;

    // Dispatch a custom event to pass recordId to the Aura parent component
    this.dispatchEvent(
      new CustomEvent("recordselect", {
        detail: { recordId }
      })
    );
  }
}
