/* eslint-disable no-console */
import { api, LightningElement, track, wire } from 'lwc'

import search from '@salesforce/apex/Rummage.search'

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 500;

export default class RummageBar extends LightningElement {

    @api object = '';
    @api fields = '';
    @api objects = [];

    @track query = '';

    base = '';
    fieldArray = [];

    @wire(search, { fieldArray: '$fieldArray', base: '$base', query: '$query' })
    wiredResult(objects) { 

        //console.dir( 'RAN WIRE  objects =>' )
        //console.dir( JSON.parse( JSON.stringify( objects ) ) )
        
        if (objects.data) {
            
            this.objects = []
            this.error = false

            this.dispatchEvent(new CustomEvent('rummaged', { detail: objects.data }))
        }
        else if (objects.error) {
            this.error = objects.error
            this.dispatchEvent(new CustomEvent('whytherum', { detail: objects.error }))
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
            console.log(`THIS>QUERY => ${this.query}`)
        }, DELAY)

        return true
    }
}