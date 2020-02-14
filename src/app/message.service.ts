import { Injectable } from '@angular/core';
import { Message } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  add(message: string) {
    this.messages.push({ body: `HeroService: ${message}` });
  }

  clear() {
    this.messages = [];
  }
  get() {
    return this.messages;
  }
}
