/* eslint-disable no-console */
import { api, LightningElement, track } from 'lwc';

export default class RummageView extends LightningElement {

    @api header = ''
    @api object = ''
    @api viewable;
    @api fields = []

    @track objects;

    handleObjects(e){
        
        this.objects = e.detail
    }
}