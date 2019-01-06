import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ManagePage } from '../manage/manage';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

  goManager() {
    this.navCtrl.push(ManagePage);
}

  goTabs() {
    this.navCtrl.push(TabsPage);
  }

}
