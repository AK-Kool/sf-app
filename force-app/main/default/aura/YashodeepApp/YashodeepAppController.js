({
	handleRecordSelect: function(component, event, helper) {
        const recordId = event.getParam("recordId");

        // Update the URL without reloading the page
        const newUrl = `/c/YashodeepApp.app?recordId=${recordId}`;
        window.history.pushState({}, '', newUrl);
    }
})