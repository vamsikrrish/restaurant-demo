import { Component, OnInit } from '@angular/core';
import { RestaurentService } from '../restaurent.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resaturent-home-page',
  templateUrl: './resaturent-home-page.component.html',
  styleUrls: ['./resaturent-home-page.component.scss']
})
export class ResaturentHomePageComponent implements OnInit {
  isLoading: boolean;

  constructor(private restaurentService: RestaurentService) { }
restaurents:any[]=[]
  ngOnInit() {
    this.fetchResaturents();
    this.restaurentService.refreshRequired.subscribe((searchTerm)=>{
      this.refresh();
    });

  }

  fetchResaturents(){
    this.isLoading=true;
    this.restaurentService.getRestaurents().subscribe((responseBody:any[])=>{
      this.isLoading=false;
      if(responseBody && responseBody.length>0){
        this.restaurentService.incrementOffset();
        console.log('data received:',responseBody);
        this.restaurents=this.restaurents.concat(responseBody);
        console.log(this.restaurents);
      }
    },(err)=>{
      this.isLoading=false;
      console.log(err);
    });
  }

  refresh(){
    this.restaurentService.resetOffset();
    this.restaurents=[];
    this.fetchResaturents();
  }
  onScroll(){
    this.fetchResaturents();
    console.log('scrolled...!!');
  }

}
