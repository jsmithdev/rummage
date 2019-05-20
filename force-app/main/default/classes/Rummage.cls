public with sharing class Rummage {
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> search(List<String> fieldArray, String base, String query) {

        if(base == '' || fieldArray.size() == 0 || query == ''){ return null; }

        
        Integer LMT = 10; // -1 for no limit

        String key = '%' + query + '%';

        String search = base;
        
        // Build where clause, skip if invalid
        for(String field : fieldArray){

            if('ID' == field.trim().toUpperCase()){
                continue;
            }
            
            search += search.indexOf(' WHERE') == -1
                ? ' WHERE '+field+' LIKE :key '
                : ' OR '+field+' LIKE :key ';
        }

        search += LMT > -1 ? ' LIMIT '+LMT+' ' : '';

        // System.debug(base); System.debug(fieldArray); System.debug(query); System.debug(search);

        return Database.query( search );
    }
}