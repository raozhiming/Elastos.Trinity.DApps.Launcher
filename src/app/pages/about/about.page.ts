import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SettingService } from "../../services/setting.service";

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

    constructor(public translate: TranslateService,
        public setting: SettingService,
        private inappBrowser: InAppBrowser) { }

    ngOnInit() {
    }

    goWebsite(url: string) {
        alert(url);
        const target = "_system";
        const options = "location=no";
        this.inappBrowser.create(url, target, options);
    }

}
