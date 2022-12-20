import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRegisterUser } from '../iregister';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  users: IRegisterUser[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Accessing the Array of Object
    const allStoredUsers = JSON.parse(localStorage.getItem('registerUsersLocalStorage')!);

    // Getting id from URL
    const loginUserID = Number(this.route.snapshot.paramMap.get('id'));

    // Filter the URL id's user Object
    const matchedUser = allStoredUsers.filter((registerInfo: any) => {
      return loginUserID == registerInfo.id;
    });
    // Convert object to string 
    const loginUserData = JSON.stringify(matchedUser);

    // Creating Object to access perticular ID in url
    const matchedUserData = localStorage.getItem('registerUsersLocalStorage');
    this.users = matchedUserData != null ? JSON.parse(loginUserData) : [];

  }

}
