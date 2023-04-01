import { Injectable } from '@angular/core';
import { GROENTEN } from './mock-groenten'; 
import { Groente } from './model/groente';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GroenteService { 

  constructor() { } 

  getGroenten(): Observable<Groente[]> {
    return of (GROENTEN);
  }

  getGroenteById(id: string): Observable<Groente | undefined> {
    return of (GROENTEN.find(groente => groente.id.toString() === id));
  }
} 