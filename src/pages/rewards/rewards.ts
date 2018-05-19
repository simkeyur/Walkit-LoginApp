import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
 
import { SettingsProvider } from '../../providers/settings/settings';
 
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {
  
  items: any = [];
    itemExpandHeight: number = 250;
 
    constructor(public navCtrl: NavController) {
 
        this.items = [
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
        ];
 
    }
 
    expandItem(item){
 
        this.items.map((listItem) => {
 
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
 
    }
    
}