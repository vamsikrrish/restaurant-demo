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
  filterParams: any;
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
    this.offset+=this.limit;
  }
  resetOffset(){
      this.offset=0;
  }
  getRestaurents(): Observable<any>{
   console.log(this.filterParams);
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
      if (this.filterPrefereneces.minPrice > 0) {
        this.filterParams.minPrice = this.filterPrefereneces.minPrice;
      }
      if (this.filterPrefereneces.maxPrice > 0) {
        this.filterParams.maxPrice = this.filterPrefereneces.maxPrice;
       }
       if (this.filterPrefereneces.minrating > 0) {
        this.filterParams.minrating = this.filterPrefereneces.minrating;
       }
       if (this.filterPrefereneces.maxrating > 0) {
        this.filterParams.maxrating = this.filterPrefereneces.maxrating;
       }


    } 
    if(this.searchTerm && this.searchTerm!=''){
      this.filterParams.searchTerm=this.searchTerm;
     }

  }
}
