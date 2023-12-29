import {Component, OnInit} from '@angular/core';
import {CatalogService} from './catalog.service';
import {Book} from "./book";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontakroo';
  public catalog: Book[];

  constructor(private catalogService: CatalogService) {}

  public getCatalog(): void {
    this.catalogService.getCatalog().subscribe(
      (response: Book[]) => {
        console.log("Got book list:");
        console.log(response);
        this.catalog = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getCatalog();
  }
}