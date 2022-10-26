import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todos$: Observable<any[]>;
  usuarios: any;
  id: number;

  constructor(
    private http: HttpClient
  ) {
    this.id = 2;
   }

  ngOnInit(): void {
  }

//   buscarid(){
//     const user = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users/' + this.id);
//     user.subscribe(x => {
//       console.log(x);
//     })
//   }

//   crearuser(){
//     this.http.post('https://jsonplaceholder.typicode.com/users/', {
//       address: { },
//       company: { },
//       email: "Sincere@april.biz",
//       id: 11,
//       name: "Rafa",
//       phone: "111111111111111111",
//       username: "Rafa",
//       website: "rafa.org"
//   }).subscribe(x => {
//     console.log(x);
//     this.usuarios.push(x)
//     console.log(this.usuarios);
    
//   })

  
  
// }

// this.todos$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
// this.todos$.subscribe(x => {
//   setTimeout(() => {
//     this.usuarios = x;
//     console.log(this.usuarios);
//   }, 3000)
// })
// console.log('CARGANDO...');


}
