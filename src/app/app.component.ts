import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppmanagerService } from "./services/appmanager.service";
import { SettingService } from "./services/setting.service";
import { SplashscreenPage } from './splash/splashscreen/splashscreen.page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        public appManager: AppmanagerService,
        public setting: SettingService,
        public modalCtrl: ModalController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            console.log("platform.ready");
            screen.orientation.lock('portrait');
            this.statusBar.styleDefault();
            this.splash();
            this.appManager.init();
            this.setting.init();
        });
    }

    async splash() {
        const splash = await this.modalCtrl.create({component: SplashscreenPage});
        return await splash.present();
    }
}
