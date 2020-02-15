import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(private messageService: MessageService) {}
  messages: string[];

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messages = this.messageService.messages;
  }

  clear() {
    this.messageService.clear();
  }
}
