public with sharing class ContactCtrl {
    @AuraEnabled
    public static List<Contact> getContacts(String searchText){
        try {
            String searchKey = '%'+ searchText +'%';
            List<Contact> contactList = [SELECT Id,Name,Account.Name FROM Contact WHERE FirstName LIKE : searchKey OR LastName LIKE : searchKey LIMIT 10];
            return contactList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}