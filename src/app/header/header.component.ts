import { Component, OnInit } from '@angular/core';
import { RestaurentService } from '../restaurent.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private restaurentService:RestaurentService) { }
  searchTerm="";
  ngOnInit() {
    
  }

  search(){
    console.log('searchedTerm is :',this.searchTerm);
    this.restaurentService.searchTermChanged.next(this.searchTerm);
  }


}
