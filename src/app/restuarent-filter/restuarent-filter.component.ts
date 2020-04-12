import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestaurentService } from '../restaurent.service';

@Component({
  selector: 'app-restuarent-filter',
  templateUrl: './restuarent-filter.component.html',
  styleUrls: ['./restuarent-filter.component.scss']
})
export class RestuarentFilterComponent implements OnInit {
  categories:any[];

  constructor(private restaurentService: RestaurentService) { }
filterForm:FormGroup;

  ngOnInit() {
    this.filterForm = new FormGroup({
      category: new FormControl(''),
      location: new FormControl(''),
      rating: new FormControl(''),
      sortBy:new FormControl('')
    });
    this.restaurentService.getCategories().subscribe((response:any[])=>{
      this.categories=response;
    },(err)=>{
      console.log(err);
    });
  }

  categorySelect(event,category){
    const formCategoryValue=this.filterForm.get('category').value;
    let selectedCategories:any[]=formCategoryValue==null || formCategoryValue==''? []:this.filterForm.get('category').value.split();
      if (event.checked) {
        category.checked = true;
        selectedCategories.push(category.id);
      } else {
        category.checked = false;
        selectedCategories = selectedCategories.filter((id) => {
          console.log(id);
          return id != category.id;
        });
      }
      this.filterForm.get('category').setValue(selectedCategories.join(',')); 
    
    }

  applyFilters(){
    console.log('APLPYING FILTERS:',this.filterForm);
    this.restaurentService.filterPreferenceChanged.next(this.filterForm.value);
  }
  clearFilters(){
    this.clearCategorySelection()
    this.filterForm.reset();
  }
  clearCategorySelection() {
    this.categories.forEach((category)=>{
      category.checked=false;
    });
  }

}
