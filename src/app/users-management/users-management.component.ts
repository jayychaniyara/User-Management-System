import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRegisterUser } from '../iregister';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  user: IRegisterUser[] = [];
  currentUserId: Number | undefined;
  _id: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const _id = Number(this.route.snapshot.paramMap.get('id'));

    const registerUserData = localStorage.getItem('registerUsersLocalStorage');
    this.user = registerUserData != null ? JSON.parse(registerUserData) : [];

    const currentUserId = this._id;
    console.log(currentUserId);
  }

  deleteUser() {
    // Getting id from URL
    const _id = Number(this.route.snapshot.paramMap.get('id'));

    // Accessing the Array of Object
    const allStoredUsers = JSON.parse(localStorage.getItem('registerUsersLocalStorage')!);

    // Finding index of perticular ID 
    const deleteUserIndex = allStoredUsers.findIndex((x: any) => x.id == _id);

    // Deleting array of selected user and updating local storage 
    allStoredUsers.splice(deleteUserIndex, 1);
    localStorage.setItem('registerUsersLocalStorage', JSON.stringify(allStoredUsers));
    this.ngOnInit();
  }
}
