@isTest
public with sharing class RummageTest {
    
    @isTest
    public static void search(){

        List<String> fieldArray = new List<String>{'Name', 'Phone'};

        String base = ' SELECT Id, Name, Phone FROM Account ';

        String query = 'bordercollies';

        Rummage.search(fieldArray, base, query);
    }
}