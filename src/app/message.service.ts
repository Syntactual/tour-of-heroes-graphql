import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(`HeroService: ${message}`);
  }

  clear() {
    this.messages = [];
  }
}
