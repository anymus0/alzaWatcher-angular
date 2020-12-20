import { Injectable } from '@angular/core';
import { io } from 'node_modules/socket.io-client';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket = io(environment.alzaWatcherSocket_URL);

  constructor() { }
}
