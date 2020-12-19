import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';
import { Product } from './models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
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

  setProducts(): void {
    this.subscriptions.push(
      this.httpService.get(`${environment.alzaWatcherAPI_URL}/getData/latestStatus`).subscribe(res => {
        this.products = res.products;
        this.lastUpdate = new Date(res.date);
        this.productsURL = res.productsURL;
        this.productIsLoading = false;
      })
    );
  }

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.setProducts();
  }

  ngOnDestroy(): void {
    // unsubscribe from subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
