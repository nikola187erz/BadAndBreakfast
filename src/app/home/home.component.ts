import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public homes: any[] = [];

  constructor(private homeService: HomeService) {
    this.homeService.get().subscribe(homes => {
      this.homes = homes;
      console.log(homes);
    })
  }

  ngOnInit() {
  }

}
