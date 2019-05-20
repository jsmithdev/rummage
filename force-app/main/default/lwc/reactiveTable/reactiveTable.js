/* eslint-disable no-console */
import { api, LightningElement, track } from 'lwc';


export default class ReactiveTable extends LightningElement {

    @api viewable

    @track data = []
    @track columns = []
    
    @api 
    get objects(){
        return this.data
    }
    set objects(data){

        if(!data){ return }
        
        const [ record ] = data

        const viewable = this.viewable.split(',').map(x => x.trim())

        const fields =  Object.keys(record).filter(x => viewable.includes(x))
        
        const columns = fields.map(x => ({ label: this.labeler(x), fieldName: x }))
        
        //console.dir( 'ReactiveTable.set.object data => ' )
        //console.dir( JSON.parse( JSON.stringify( {viewable} ) ) )

        this.columns = columns
        this.data = data
    }

    labeler(raw){

        const s = raw.replace('__c', '').replace(/_/gi, ' ')
        
        return s
    }
}