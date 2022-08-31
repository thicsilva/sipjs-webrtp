import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SipjsService } from '../../services/sipjs.service';
import { Globals } from '../../globals';
import { RecordCallService } from 'src/app/services/record-call.service';

@Component({
  selector: 'app-funct-buttons',
  templateUrl: './funct-buttons.component.html',
  styleUrls: ['./funct-buttons.component.css']
})
export class FunctButtonsComponent implements OnInit {

  glob: Globals;

  constructor(
    private router: Router,
    public sipJs: SipjsService,
    public recordCal: RecordCallService,
    glob: Globals
  ) {
    this.glob = glob;
   }

  ngOnInit(): void {

  }

  public async makeCall(vidOpt: boolean): Promise<void> {

    const oc = window.localStorage.getItem('onCall');

    if (oc === 'true' && !this.glob.onCall) {
      alert('You are on a call from this browser');
      return;
    }
    const phoNumb = this.glob.outgoingNumber;

    await this.sipJs.makeCall(phoNumb, vidOpt).then(async ()=>{
      this.glob.outgoingCall = true;
      if (vidOpt) {
        await this.router.navigate(['room']);
      }
    })

  }


  public async hangupCall(): Promise<void> {

    await this.sipJs.hangupCall();

  }

  setMute(): void {

    if (!this.sipJs.isMuted()) {
      this.sipJs.mute();
    } else {
      this.sipJs.unmute();
    }
  }

  setRecordState():void{
    if (!this.glob.isRecording){
      this.recordCal.startRecord();
    } else {
      this.recordCal.stopRecord();
    }
  }

  switchDialpad(): void {
    console.log('...');
  }

  transferCall(): void {
    console.log('...');
  }

  callToOther():void{
    this.sipJs.sendDTMF("*");
    this.sipJs.sendDTMF("2");
    setTimeout(()=>2000);
    this.sipJs.sendDTMF("1");
    this.sipJs.sendDTMF("1");
    this.sipJs.sendDTMF("1");
    this.sipJs.sendDTMF("1");
  }

}
