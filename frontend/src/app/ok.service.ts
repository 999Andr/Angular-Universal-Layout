import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; 
import { tap, retry, catchError} from 'rxjs/operators';
import {Car} from './car';


@Injectable({providedIn: 'root'})

export class OkService {
   
  car: Car;
  
  url: string = 'https://private-backend/app';
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getRootNote(): Observable<Car> {
    return this.http.get<Car>(`${this.url}/api`)
  } 

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/api/read`) 
    .pipe(
          tap(_ => console.log('fetched cars')),
          retry(3),
          catchError(this.handleError)
      )
  }

  getCar(id): Observable<Car> { 
    return this.http.get<Car>(`${this.url}/api/read/${id}`) 
    .pipe(
         tap(_ => console.log(`fetched car with id:${id}`)),
         retry(3),
         catchError(this.handleError)
      )
  }

  pushCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.url}/api/create`, car, this.httpOptions) 
    .pipe(
         tap(_ => console.log(`registered new car: ${car.item}`)),
         retry(3),
         catchError(this.handleError)
      )
  }

  updateCar(car: Car): Observable<any> {
    return this.http.put(`${this.url}/api/update/${car.id}`, car, this.httpOptions) 
    .pipe(
         tap(_ => console.log(`updated car with id:${car.id}`)),
         retry(3),
         catchError(this.handleError)
      )
  }

  deleteCar(id): Observable<any> {
    return this.http.delete(`${this.url}/api/delete/${id}`, this.httpOptions) 
    .pipe(
          tap(_ => console.log(`deleted car with id:${id}`)), 
          retry(3),
          catchError(this.handleError)
      )
  }
 

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      
      msg = error.error.message;
    } else {
      
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
