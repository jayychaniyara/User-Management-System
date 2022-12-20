import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegisterUser } from '../iregister';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  users: IRegisterUser[] = [];
  editUserForm: any = FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {

    // Accessing the Array of Object
    const allStoredUsers = JSON.parse(localStorage.getItem('registerUsersLocalStorage')!);

    // Getting id from URL
    const loginUserID = Number(this.route.snapshot.paramMap.get('id'));

    // Filter the URL id's user Object
    const matchedUser = allStoredUsers.filter((registerInfo: any) => {
      return loginUserID == registerInfo.id;
    });

    this.editUserForm = this.fb.group({
      fullName: [matchedUser[0].fullName, [Validators.required]],
      email: [matchedUser[0].email, [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]]
    });

    // Convert object to string 
    const loginUserData = JSON.stringify(matchedUser);

    // Creating Object to access perticular ID in url
    const matchedUserData = localStorage.getItem('registerUsersLocalStorage');
    this.users = matchedUserData != null ? JSON.parse(loginUserData) : [];

  }


  editUser() {
    // Getting id from URL
    const _id = Number(this.route.snapshot.paramMap.get('id'));

    // Accessing the Array of Object
    const allStoredUsers = JSON.parse(localStorage.getItem('registerUsersLocalStorage')!);

    // Storing new Full Name and Email value in variable
    const newFullName = (document.getElementById("newFullName") as HTMLInputElement).value;
    const newEmail = (document.getElementById("newEmail") as HTMLInputElement).value;

    // Finding index of perticular ID 
    const currentUserIndex = allStoredUsers.findIndex((x: any) => x.id == _id);

    // Finding Object in Array of object via Index of current user
    const currentUserInfo = allStoredUsers[currentUserIndex];

    // Updating current user object via New updated value
    currentUserInfo.fullName = newFullName;
    currentUserInfo.email = newEmail;

    // Updating Array of object with single object value
    allStoredUsers.currentUserInfo;

    // Updating local storage 
    localStorage.setItem("registerUsersLocalStorage", JSON.stringify(allStoredUsers));

  }
}