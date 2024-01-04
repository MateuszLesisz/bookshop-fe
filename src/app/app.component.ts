import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from "./book";
import { catchError, tap } from 'rxjs/operators';
import { CartItem } from "./cartitem";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontakroo';
  public catalog: Book[];
  public cartItem: CartItem[] = [];

  constructor(private catalogService: CatalogService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getCatalog().toPromise();
  }

  getCatalog(): Observable<Book[]> {
    return this.catalogService.getCatalog().pipe(
      tap((response: Book[]) => {
        console.log("Got book list:");
        console.log(response);
        this.catalog = response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        throw error; // Rzucenie błędu, aby przekazać go dalej
      })
    );
  }

  public addToCart(book: Book): void {
    const current: CartItem = this.cartItem.find(x => x.bookId == book.id)!;
    if (current) {
      current.quantity += 1;
    } else {
      this.cartItem.push({bookId: book.id, quantity: 1} as CartItem);
    }
    console.log('Cart is' + JSON.stringify(this.cartItem));
  }

  public countCartItems(): number {
    return this.cartItem
    .reduce((sum, current) => sum + current.quantity, 0)
  }
}
