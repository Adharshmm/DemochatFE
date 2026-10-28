import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import {enviornment} from '../../../enviornments/enviornment'
@Injectable({
  providedIn: 'root'
})
export class ChathubService {
  
  private connection = new signalR.HubConnectionBuilder().withUrl(enviornment.signalUrl).withAutomaticReconnect().build();
  async startConection(): Promise<void> {
    await this.connection.start();
  }
  onReceiveMessage(callback:(user:string,message: string)=>void):void{
    this.connection.on('ReceiveMessage',callback);
  }
  async sendMessage(message:string,user:string):Promise<void>{
    await this.connection.invoke('SendMessage',user,message);
  }
  constructor() { }
}
