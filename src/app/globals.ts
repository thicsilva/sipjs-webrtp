import { Injectable } from '@angular/core';

@Injectable()

// ***** Class to handle global variables that control several objects and functions in the UI
export class Globals {

  // ***** Object to be used for setup the user credentials, set as Local Storage and to be
  // ***** reuse it to make login when the user refreh de web site
  userCredentials = { extension: null,
                      password: null,                      
                      realm: null,
                      wsServer: null };

  incomingCall = false;
  outgoingCall = false;
  outgoingNumber = '';
  incomingNumber = '';

  onCall: boolean;
  showOncall: boolean;
  isRecording: boolean = false;

  videoChat: boolean;
  maxListCalls = 3;
  showNavBar: boolean;


}
