import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CanonicalService } from './shared/canonical.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent {
    title = 'frontend';
 
    constructor(
                private metaTagService: Meta,
                private canonicalService: CanonicalService
    ) { }

    ngOnInit() {
        this.metaTagService.addTags([
        { name: 'keywords', 
        content: 
        'Angular Universal, Angular, SEO, SSR, RESTful architecture, Simple-RESTful-API-Universal'},
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'https://github.com/999Andr' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'date', content: '2020-05-31', scheme: 'YYYY-MM-DD' }
        ]);
        this.canonicalService.setCanonicalURL();

    }
}
