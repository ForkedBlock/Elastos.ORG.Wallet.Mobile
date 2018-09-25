import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Util} from "../../providers/Util";
import {Native} from "../../providers/Native";
import {AddprivatekeyPage} from '../../pages/addprivatekey/addprivatekey';
@Component({
  selector: 'page-importprivatekey',
  templateUrl: 'importprivatekey.html',
})
export class ImportprivatekeyPage {
  public msobj:any;
  public importText:string="xprv9s21ZrQH143K2UGVHfyyduzwS2ce8YN7WDVcDUh2bo8crhGbjnBjtfHugXpe9zUvjzwoDvcWX81ePnKDCJG7uN3Sqg15SXcGntzfTb42ayi";
  public passWord:string="s12345678";
  public rePassWorld:string="s12345678";
  constructor(public navCtrl: NavController, public navParams: NavParams,public native:Native) {
    this.msobj = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportprivatekeyPage');
  }

  import(){

        if(this.checkParms()){
            this.msobj["importText"] = this.importText;
            this.msobj["passWord"] = this.passWord;
            this.navCtrl.push(AddprivatekeyPage,this.msobj);
        }
  }
  checkParms(){
    if(Util.isNull(this.importText)){
      this.native.toast_trans('text-import-privatekey-placeholder');
      return false;
    }
    if(Util.isNull(this.passWord)){
      this.native.toast_trans('text-pay-password');
      return false;
    }

    if(this.passWord!=this.rePassWorld){
      this.native.toast_trans('text-passworld-compare');
      return false;
    }
    return true;
  }
}