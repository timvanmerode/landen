import { Injectable } from '@angular/core';
import { WINKELS } from './mock-winkels'; 
import { Winkel } from './model/winkel';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WinkelService { 

  constructor() { } 

  getWinkels(): Observable<Winkel[]> {
    return of(WINKELS);
  }

  getWinkelById(id: string): Observable<Winkel | undefined> {
    return of (WINKELS.find(winkel => {
      return winkel.id.toString() === id
    }));
  }

  handleError<T>(operation = 'operation', result?: T) { 
    return (error: any): Observable<T> => { 
      console.log(operation, error);
      return of(result as T);
    };
  } 
} 
