import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root',
})
export class GridService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {

  }


  get(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}`
    ).pipe(map((data: any) => {
      // console.log(data , 'data S')
      return data
    }));
  }
}
