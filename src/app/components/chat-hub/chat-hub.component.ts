import { Component, OnInit } from '@angular/core';
import { ChathubService } from '../../services/chatHub/chathub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {enviornment} from '../../../enviornments/enviornment'

@Component({
  selector: 'app-chat-hub',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-hub.component.html',
  styleUrl: './chat-hub.component.css'
})
export class ChatHubComponent implements OnInit {
  userName = '';
  messages:{user:string; message:string}[]=[]
  constructor(private chatHub:ChathubService){}
  async ngOnInit(): Promise<void> {
    this.chatHub.onReceiveMessage((message,user)=>{
      this.messages.push({
        user:user,
        message:message
      })
    });

    await this.chatHub.startConection()
  }
  async send(message:string):Promise<void>{
    await this.chatHub.sendMessage(this.userName ,message);
  }
}
