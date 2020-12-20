import { Component, OnInit, OnDestroy } from '@angular/core';
import { Network } from '@ngx-pwa/offline';
import { environment } from './../environments/environment';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';
import { Product } from './models/Product';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public online: boolean;
  private subscriptions: Array<Subscription> = [];
  imgURL: string = null;
  products: Array<Product> = null;
  lastUpdate: Date = null;
  productsURL: string;
  productIsLoading = true;
  imgIsLoading = false;

  setImageURL(): void {
    this.imgIsLoading = true;
    this.subscriptions.push(
      this.httpService.get(`${environment.alzaWatcherAPI_URL}/getData/latestImage`).subscribe((res) => {
        this.imgURL = `${environment.alzaWatcherAPI_URL}/${res.image}`;
        this.imgIsLoading = false;
      })
    );
  }

  private setProducts(products: Array<Product>, lastUpdate: Date, productsURL: string): void {
    this.products = products;
    this.lastUpdate = lastUpdate;
    this.productsURL = productsURL;
    this.productIsLoading = false;
  }

  constructor(
    private httpService: HttpService,
    protected network: Network,
    private socketService: SocketioService
  ) {}

  ngOnInit(): void {
    // initial fetch
    this.subscriptions.push(
      this.httpService.get(`${environment.alzaWatcherAPI_URL}/getData/latestStatus`).subscribe(res => {
        this.setProducts(res.products, res.date, res.productsURL);
      })
    );
    // realtime refresh products
    this.socketService.socket.on('productRefresh', (res: any) => {
      this.setProducts(res.products, res.date, res.productsURL);
    });
    // online/offline status
    this.subscriptions.push(
      this.network.onlineChanges.subscribe(onlineStatus => {
        // set current online/offline status (bool)
        this.online = onlineStatus;
      })
    );
  }

  ngOnDestroy(): void {
    // unsubscribe from subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
