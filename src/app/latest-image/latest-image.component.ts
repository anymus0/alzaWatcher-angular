import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-latest-image',
  templateUrl: './latest-image.component.html',
  styleUrls: ['./latest-image.component.scss']
})
export class LatestImageComponent implements OnInit {
  @Input() imgURL: string;

  constructor() {}

  ngOnInit(): void {}

}
