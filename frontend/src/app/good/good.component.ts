import { Component, OnInit } from '@angular/core';
import { OkService } from '../ok.service';
import {Car} from '../car';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 

import { map, filter} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.css']
})

export class GoodComponent implements OnInit {
  
    title = 'Cars list. Angular Universal.';
  
    constructor(
        private formBuilder: FormBuilder, 
        private okService: OkService, 
        private route: ActivatedRoute,
        private titleService: Title,
        private metaTagService: Meta
    ) { }
  
    cars: Car[];
    car: Car;
    registered = false;
    submitted = false;
    carForm: FormGroup;
  
    invalidCarName() {
        return (this.submitted && this.carForm.controls.item.errors != null);
    }
  
    trackByFn(index, item) {
        return index; 
    } 
  

    ngOnInit() {
        this.getData();
    
        this.carForm = this.formBuilder.group({
        item: ['', [Validators.required, Validators.maxLength(9)]],
        });

        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
            { name: 'description', content: 'Angular Universal. SSR. Cars list layout' }
        );
    }

  
    deleteCar(arg) { 
        this.cars = this.cars.filter(c => c.id !== arg);
        this.okService.deleteCar(arg)
        .subscribe(data => this.registered = false,  
                  err => console.error(err) 
        )
    }
  
    getData() {
    
        this.okService.getAllCars()
            .pipe( 
                map(data=> { return data.length>10? 
                             data.filter((newCar:Car) => (newCar.id)!=10): data }
                )
            )
            .subscribe( result => {  this.cars = result; this.deleteCar(10);},
                      err => console.error(err)
            );
    }


    onSubmit() {
        this.submitted = true;

        if (this.carForm.invalid == true) {
            return;
        } else { 
          let car: Car = Object.assign({ id: this.cars.length }, this.carForm.value);
      
          this.okService.pushCar(car)
          .subscribe(data => { console.log(data); this.cars.push(car); }, 
                     err => console.error(err)  
          )
          
          this.registered = true; 
          this.carForm.reset();
          this.submitted = false;

        }
    }

}
