import { Injectable } from '@angular/core';
import { LANDEN } from './mock-landen'; 
import { Land } from './model/land';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
 })
 export class LandService { 
  private landenUrl= 'api/landen'; 
  getLanden():Observable<Land[]>{
  return this.http.get<Land[]>(this.landenUrl).pipe(catchError(this.handleError('getLanden', [])));
  } 

  getTopLanden(top: number):Observable<Land[]>{
    return this.http.get<Land[]>(this.landenUrl)
    .pipe(map(landen => landen.sort(function (a, b) { return b.inwoners - a.inwoners; }).slice(0, top)),
    catchError(this.handleError('getTopLanden', []))
    );
  }
  getLandId(id: number): Observable<Land | undefined> { 

  const url = `${this.landenUrl}/${id}`; 
  return this.http.get<Land>(url)
    .pipe(catchError(this.handleError<Land>(`getLand id=${id}`))
  );
  } 

  updateLand(land: Land): Observable<any> {
    return this.http.put(this.landenUrl, land, httpOptions)
      .pipe(catchError(this.handleError<any>('updateLand'))
    );
  }

  addLand(land:Land): Observable<Land>{
    return this.http.post<Land>(this.landenUrl, land, httpOptions)
      .pipe(catchError(this.handleError<Land>('addLand'))
    );
  }

  constructor(private http: HttpClient) { } 

  handleError<T>(operation = 'operation', result?: T) { 

    return (error: any): Observable<T> => { 
      console.log(operation, error);
      return of(result as T);
    };
  } 
} 
 
