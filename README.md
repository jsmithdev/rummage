# Rummage 🐒

## Salesforce LWC for searching thru records by setting sObject and fields via the builder 🛠

### [🔍 Demo](https://jsmithdev-developer-edition.na85.force.com/s/)

### Screenie of [rummage-view](force-app/main/default/lwc/reactiveView) containing [rummage-bar](force-app/main/default/lwc/reactiveTable) and [reactive-table](force-app/main/default/lwc/reactiveTable) 

![demo](https://i.imgur.com/2lQFYnp.png)

### Builder view (works in App & Community Builder)

![builder](https://i.imgur.com/LgdyMxD.png)

## Limits

This uses SOQL's LIKE operator to preform searches via the accompanying Rummage Apex class

In SOQL, the LIKE operator supports **string fields only** which is stated in the docs [here](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_comparisonoperators.htm)

String data types include Text, Phone, Picklist, URL, etc.

If you need to search other data types, creating a text based formula field may help

**Example:** TEXT( Expiration_Date__c )

## Deploy

Covert with SFDX; This creates a folder called `deploy`

```bash
sfdx force:source:convert -r force-app -d deploy
```

Now you can deploy from the resulting `deploy` directory

📌  Below deploys to the default org set; Add `-u user@domain.com` or `-u alias` to deploy else where

```bash
sfdx force:mdapi:deploy -d deploy -w -1  -l RunSpecifiedTests -r RummageTest --verbose
```


Results should more or less mirror below
```bash
Deployment finished in 121000ms

=== Result
Status:  Succeeded
jobid:  0Af3b000003ZSudCAG
Completed:  2019-05-17T14:39:25.000Z
Component errors:  0
Components deployed:  5
Components total:  5
Tests errors:  0
Tests completed:  1
Tests total:  1
Check only: false

=== Test Success [1]
NAME         METHOD
───────────  ──────
RummageTest  search

=== Apex Code Coverage
NAME     % COVERED  UNCOVERED LINES
───────  ─────────  ───────────────
Rummage  92%        19

Total Test Time:  158.0

=== Components Deployed [5]
TYPE                      FILE                            NAME           ID
────────────────────────  ──────────────────────────────  ─────────────  ──────────────────
                          deploy/package.xml              package.xml
ApexClass                 deploy/classes/Rummage.cls      Rummage        01p3b000000JeCWAA0
ApexClass                 deploy/classes/RummageTest.cls  RummageTest    01p3b000000JeCXAA0
LightningComponentBundle  deploy/lwc/reactiveTable        reactiveTable  0Rb3b0000004C9NCAU
LightningComponentBundle  deploy/lwc/rummageBar           rummageBar     0Rb3b0000004C9OCAU
LightningComponentBundle  deploy/lwc/rummageView          rummageView    0Rb3b0000004C9PCAU
```

---

Coded with 💝 by [Jamie Smith](https://jsmith.dev)