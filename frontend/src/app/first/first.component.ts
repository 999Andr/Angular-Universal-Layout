import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  
    title = 'Site Code. Angular Universal';
  
    constructor( 
                private titleService: Title,
                private metaTagService: Meta ) { }

    ngOnInit(): void {
   
        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
        { name: 'description', 
        content: 
        'Site code, building Angular Universal app, RESTful architecture, deployd to Firebase' }
        );
    }

}
