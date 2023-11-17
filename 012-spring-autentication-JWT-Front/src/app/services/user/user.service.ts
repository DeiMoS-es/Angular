import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { User } from '../../interface/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURLUser = "http://localhost:8080/usuario";
  userData: User;
  private userDataSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) { }

  public buscarUsuarioNombre(username: string): Observable<any> {
    console.log(username);    
    return this.httpClient.get(`${this.baseURLUser}/buscarUsuarioNombre/${username}`);     
  }

  public updateUserInfo(user: User){
    this.userData = user;
    localStorage.setItem('userData', JSON.stringify(user));
  }

  public setUserData(userData: User): void {
    this.userDataSubject.next(userData);
  }

  public getUserData(): Observable<User | null> {
    const storedData = localStorage.getItem('userData');
    return storedData ? of(JSON.parse(storedData)) : EMPTY;
  }

  public deleteUserData():void{
    localStorage.removeItem('userData');
    this.userDataSubject.next(null);
  }
}
