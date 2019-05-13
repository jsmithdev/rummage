/* eslint-disable no-console */
import { api, LightningElement, track } from 'lwc';

const viewable = ['Name', 'Phone']

export default class ReactiveTable extends LightningElement {

    @track data = []
    @track columns = []
    
    @api 
    get objects(){
        return this.data
    }
    set objects(data){

        if(!data){ return }
        

        const [ record ] = data

        const fields =  Object.keys(record).filter(x => viewable.includes(x))
        
        const columns = fields.map(x => ({ label: this.labeler(x), fieldName: x }))
        
        
        console.dir( 'ReactiveTable.set.object data => ' )
        console.dir( JSON.parse( JSON.stringify( {columns, data} ) ) )


        this.columns = columns
        this.data = data
    }

    labeler(raw){

        const s = raw.replace('__c', '')
        
        return s
    }
}
