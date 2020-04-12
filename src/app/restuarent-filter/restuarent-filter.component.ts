import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestaurentService } from '../restaurent.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-restuarent-filter',
  templateUrl: './restuarent-filter.component.html',
  styleUrls: ['./restuarent-filter.component.scss']
})
export class RestuarentFilterComponent implements OnInit {
  categories:any[];

  constructor(private restaurentService: RestaurentService) { }
filterForm:FormGroup;
options: Options = {
  floor: 0,
  ceil: 10000,
  step: 50
};
ratings:any[]=[
  {id:1,checked:false},
  {id:2,checked:false},
  {id:3,checked:false},
  {id:4,checked:false},
  {id:5,checked:false}
];
  ngOnInit() {
    this.filterForm = new FormGroup({
      category: new FormControl(''),
      location: new FormControl(''),
      rating: new FormControl(''),
      priceRange:new FormControl([0,10000]),
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
    let selectedCategories:any[]=formCategoryValue==null || formCategoryValue==''? []:formCategoryValue.value.split();
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

    ratingSelect(event,rating){
      const formRatingValue=this.filterForm.get('rating').value;
      let selectedRatings:any[]=formRatingValue==null || formRatingValue==''? []:formRatingValue.split(',');
        if (event.checked) {
          rating.checked = true;
          selectedRatings.push(rating.id);
        } else {
          rating.checked = false;
          selectedRatings = selectedRatings.filter((id) => {
            console.log(id);
            return id != rating.id;
          });
        }
        this.filterForm.get('rating').setValue(selectedRatings.join(',')); 
      
      }

  applyFilters(){
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
