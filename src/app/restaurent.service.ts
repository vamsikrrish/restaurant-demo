import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurentService {

 
  restaurentData: Observable<any>;
  offset: number=0;
  limit:number=25;
  searchTermChanged:Subject<string>= new Subject();
  filterPreferenceChanged:Subject<any>=new Subject();
  filterPrefereneces:any;
  searchTerm: string;
  filterParams: any={};
  sortBy: string;
  refreshRequired: Subject<boolean>=new Subject();

  constructor(private http: HttpClient) { 
    this.searchTermChanged.subscribe((searchTerm)=>{
      this.searchTerm=searchTerm;
      this.formFilterParameter();
      this.refreshRequired.next();

    });
    this.filterPreferenceChanged.subscribe((filterPreferences)=>{
      console.log('filter options:',filterPreferences);
      this.filterPrefereneces=filterPreferences;
      this.formFilterParameter();
      this.refreshRequired.next();
    });
  }
  incrementOffset() {
    this.offset=this.offset+this.limit;
    console.log(this.limit,this.offset);
  }
  resetOffset(){
      this.offset=0;
  }
  getRestaurents(): Observable<any>{
   console.log(this.filterParams);
   this.filterParams.limit=this.limit;
   this.filterParams.offset=this.offset;
   return this.http.get('http://localhost:8080/get-restaurents',{params:this.filterParams});
  }
  getCategories() {
    return this.http.get('http://localhost:8080/get-all-categories');
  }
  
  formFilterParameter() {
    this.filterParams = {};
    if (this.filterPrefereneces) {
      if (this.filterPrefereneces.sortBy) {
       this.filterParams.sortBy=this.filterPrefereneces.sortBy;
      }
      if (this.filterPrefereneces.category && this.filterPrefereneces.category!='') {       
       this.filterParams.category = this.filterPrefereneces.category;
      }
      if (this.filterPrefereneces.rating && this.filterPrefereneces.rating != '') {
        this.filterParams.rating = this.filterPrefereneces.rating;
       }
      if (this.filterPrefereneces.priceRange && this.filterPrefereneces.priceRange.length > 0) {
        this.filterParams.minPrice = this.filterPrefereneces.priceRange[0];
        this.filterParams.maxPrice = this.filterPrefereneces.priceRange[1];
       }
    } 
    if(this.searchTerm && this.searchTerm!=''){
      this.filterParams.searchTerm=this.searchTerm;
     }

  }
}
