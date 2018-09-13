import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ExprotPrikeyComponent} from "../exprot-prikey/exprot-prikey.component";
import {PaypasswordResetComponent} from "../paypassword-reset/paypassword-reset.component";
import {LauncherComponent} from "../../launcher/launcher.component";
import {LanguagePage} from '../../../pages/wallet/language/language';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
})
export class ManagerComponent extends BaseComponent implements OnInit {

  walletName = ""

  ngOnInit() {
    this.setTitleByAssets('text-wallet-manager');
    // wallet name
    this.localStorage.getWallet().then((val) => {
      if (val) {
        this.walletName = JSON.parse(val).name;
      }
    });
  }

  onItem(i) {
    switch (i){
      case 0:
        this.Go(ExprotPrikeyComponent);
        break;
      case 1:
        this.Go(PaypasswordResetComponent);
        break;
      case 2:
        this.popupProvider.ionicConfirm('confirmTitle', 'confirmSubTitle').then((data) => {
          if (data) {
            this.destroyWallet("1");
          }
        });
        break;
      case 3:
      this.localStorage.getLanguage("wallte-language").then((val)=>{
             let item =JSON.parse(val);
             this.Go(LanguagePage,item);
      })

         break;
    }
  }

  destroyWallet(masterWalletId: string){
    this.localStorage.remove('coinListCache').then(()=>{
      this.localStorage.remove('ELA-Wallet').then(() => {
        this.walletManager.destroyWallet(masterWalletId, (result)=>{
          //this.Go(LauncherComponent);
          this.setRootRouter(LauncherComponent);
        });
      });
    });
  }

  getDiD(){
    this.walletManager.getDIDList((result)=>{
                let list= result["list"];
                if(list === null){
                     return;
                }
    })
  }

  destroyDiD(did){
     this.walletManager.destoryDID(did,(result)=>{

     })
  }



}
