import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Follower} from '../app/followers'

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  constructor(private http: HttpClient) { }
  getUserName(user):Observable<any>{
    return this.http.get<any>('https://api.github.com/search/users',{
      params:{
        q:user
      }
    })
  }
  getIndividualUser(login):Observable<any>{
    return this.http.get<any>(`https://api.github.com/users/${login}`)
  }
  getFollowers(url):Observable<any>{
    return this.http.get<any>(url)
  }
}
