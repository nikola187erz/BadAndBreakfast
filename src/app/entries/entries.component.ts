import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  public home: any = {
    propertyType: null,
    name: null,
    description: null,
    pricePerNight: null,
    img: null,
    area: null
  }

  constructor(private homeService: HomeService, private route: ActivatedRoute) {
    this.homeService.getById(this.route.snapshot.params.id).subscribe(home => {
      this.home = home;
      console.log(home)
    })
  }

  ngOnInit(): void {
  }

}
