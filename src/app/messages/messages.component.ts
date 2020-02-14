import { Component, OnInit } from '@angular/core';
import {
  GetMessagesGQL,
  Message,
  ClearMessagesGQL,
  GetMessagesQuery,
  GetMessagesDocument,
} from '../../generated/graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(
    private getMessagesGQL: GetMessagesGQL,
    private clearMessagesGQL: ClearMessagesGQL
  ) {}
  messages$: Observable<Message[]>;

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messages$ = this.getMessagesGQL
      .watch()
      .valueChanges.pipe(map(({ data }) => {
        console.log(data);
        return data.messages;
        }));
  }

  clear() {
    this.clearMessagesGQL
      .mutate({
        update: store => {
          const data: GetMessagesQuery = store.readQuery({
            query: GetMessagesDocument,
          });
          data.messages = [];
          store.writeQuery({ query: GetMessagesDocument, data });
        },
      })
      .subscribe();
  }
}
