import { Injectable } from '@angular/core';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class RecordCallService {

  private mediaRecorder: MediaRecorder;
  private chunks = [];  
  private globals: Globals;

  constructor(globals: Globals) {    
    this.globals = globals;    
  }

  public setupMediaRecorder(inputStream:MediaStream, outputStream:MediaStream)
  {    
    const context = new AudioContext();
    const input = context.createMediaStreamSource(inputStream);
    const output = context.createMediaStreamSource(outputStream);    
    const finalAudio = context.createMediaStreamDestination();
    
    this.mediaRecorder = new MediaRecorder(finalAudio.stream);
    input.connect(finalAudio);
    output.connect(finalAudio);
    this.setListeners();
  }

  public startRecord() {
    console.log('starting record');
    this.globals.isRecording = true;
    this.mediaRecorder.start();
  }

  public stopRecord() {
    this.mediaRecorder.stop();
    this.globals.isRecording = false;
  }

  private setListeners() {
    this.mediaRecorder.onstop = (e) => {
      const audio = document.createElement('audio');
      audio.setAttribute('controls', '');
      audio.controls = true;
      const blob = new Blob(this.chunks, { 'type': 'audio/wav' })
      const file = { filename: new Date().toDateString(), data: blob };
      this.chunks = [];
      const audioUrl = window.URL.createObjectURL(blob);
      audio.src = audioUrl;
      let a = document.createElement('a')
      document.body.appendChild(a);
      a.setAttribute('style', 'display:none');
      a.href = audioUrl;
      a.download = file.filename;
      a.click();
      window.URL.revokeObjectURL(audioUrl);
      a.remove();
    }

    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    }
  }
}
