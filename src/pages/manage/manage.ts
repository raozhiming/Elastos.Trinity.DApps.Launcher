import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';

import {InfoPage} from '../info/info';

declare let appManager: any;

let appListInfos = []; // 应用列表

function display_msg(content) {
    console.log("ElastosJS  ManagePage === msg " + content);
}

@Component({
    selector: 'page-manage',
    templateUrl: 'manage.html',
})
export class ManagePage {
    public checkIndex = []; // 复选框选中的应用集合
    public isShow = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController
    ) {
        this.refleshList();
        // this.addListen();
    }

    refleshList() {
        window.localStorage.setItem('shouldLauncherBeRefreshed_manage', '0'); // manage页刷新标识: 0-不刷新, 1-刷新.
        window.localStorage.setItem('shouldLauncherBeRefreshed_home', '1'); // home页刷新标识: 0-不刷新, 1-刷新.

        let _this = this;

        appManager.getAppInfos(function refreshItems(ret) {
            display_msg("refreshItems ret: " + JSON.stringify(ret));
            if (ret != null) {
                appListInfos = _this.dealData(ret);
                display_msg("refreshItems appListInfos: " + JSON.stringify(appListInfos));
            }
        }, function (err) {
            display_msg("refreshItems err: " + JSON.stringify(err));
        });
    }

    dealData(data) {
        let arr = [];
        if (typeof data == 'object') {
            for (const key in data) {
                arr.push({
                    id: data[key].id,
                    name: data[key].name,
                    version: data[key].version,
                    bigIcon: data[key].icons[0].src,
                    builtIn: data[key].builtIn
                })
            }
        } else {
            arr = data;
        }
        return arr;
    }


    getAppInfoList() {
        if ('1' == window.localStorage.getItem('shouldLauncherBeRefreshed_manage')) {
            this.refleshList();
        }
        display_msg("getAppInfoList " + JSON.stringify(appListInfos));
        return appListInfos;
    }

    /**
     *
     * @desc  页面跳转到首页
     */
    goToIndex() {
        this.navCtrl.pop();
    }

    /**
     *
     * @desc  页面跳转到详情
     */
    goInfo(item) {
        this.navCtrl.push(InfoPage, item);
    }

    /**
     *
     * @desc 列表选中
     */
    checkApp(item) {
        item.checked = !item.checked;
        if (this.checkIndex.indexOf(item) < 0) {
            this.checkIndex.push(item);
        } else {
            this.checkIndex.splice(this.checkIndex.indexOf(item), 1)
        }
        if (this.checkIndex.length > 0) {
            this.isShow = true;
        } else {
            this.isShow = false;
        }
    }

    /**
     *
     * @desc   删除操作
     */
    doDel() {
        this.showDelPrompt();
    }

    /**
     *
     * @desc 确认删除弹窗
     */
    showDelPrompt() {
        let _this = this;
        const prompt = _this.alertCtrl.create({
            //   title: '<div class="permission-warning">安装该应用需要获取以下权限</div>',
            message: '<div class="m-center">确认删除应用</div>',
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确认',
                    handler: data => {
                        console.log('Saved clicked');
                        _this.checkIndex.forEach(function (item) {
                            if (item.builtIn == 1) {
                                console.log("can not delete built-in app " + item.id);
                                // _this.showCanNotDelPrompt(item);
                            } else {
                                appManager.unInstall(item.id, function (ret) {
                                    console.log("already deleted " + item.id);
                                }, function (err) {
                                    console.log("delete app " + item.id + " failed: " + JSON.stringify(err));
                                });
                            }
                        });
                        _this.refleshList();
                        _this.checkIndex = [];
                    }
                }
            ]
        });
        prompt.present();
    }

}
