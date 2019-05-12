/* eslint-disable no-console */
import { api, LightningElement, track, wire } from 'lwc'

import search from '@salesforce/apex/Rummage.search'

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 300;

export default class Rummage extends LightningElement {

    @api header;
    @api object = '';
    @api fields = '';

    @track query = '';
    @track objects = [];

    base = '';
    fieldArray = [];

    @wire(search, { fieldArray: '$fieldArray', base: '$base', query: '$query' })
    wiredResult(objects) { 

        console.dir( 'RAN WIRE  objects =>' )
        console.dir( JSON.parse( JSON.stringify( objects ) ) )
        
        if (objects.data) {
            
            const sobjects = objects.data

            this.objects = []

            for(const key in sobjects){
                if (Object.prototype.hasOwnProperty.call(sobjects, key)) {
                    this.objects.push({ 
                        key, 
                        record: sobjects[key],
                        demo: this.getDemo(sobjects[key])
                    })
                }
            }
        }
        else if (objects.error) {
            this.error = objects.error.body.message
        }
    }

    handleKeyChange(event) {

        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout)

        const query = event.target.value

        if(!query){
            this.objects = []
        }

        if(!this.base){
            this.base = `SELECT ${this.fields} FROM ${this.object} `
        }

        if( ! this.fieldArray.length ){
            this.fieldArray = this.fields.split(',')
        }

        if(!query || !this.fieldArray.length || !this.base){
            return false
        }

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.query = query            
        }, DELAY)

        return true
    }

    getDemo(sobject){
        
        const array = []
        
        for(const field in sobject){
            if (Object.prototype.hasOwnProperty.call(sobject, field)) {
                array.push(`${field}: ${sobject[field]}`)
            }
        }

        return array.join(', ')
    }
}