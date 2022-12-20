import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IChatManagement } from '../ichat-management';
@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit {

  getItemFromLocalStorage: any;
  groupChatForm!: FormGroup;
  userChatList: any;
  user: IChatManagement[] = [];
  chatUserName: string = "";
  currentUserID: number = 0;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngAfterVieChecked(): void {
    this.scrollToDown();
  }

  ngOnInit(): void {

    this.groupChatForm = this.fb.group({
      message: ['', [Validators.required]],
    })
    this.currentUserID = Number(this.route.snapshot.paramMap.get('id'));

    const allStoredUsers = JSON.parse(localStorage.getItem('registerUsersLocalStorage')!);
    const currentUserIndex = allStoredUsers.findIndex((x: any) => x.id == this.currentUserID);
    const currentUserInfo = allStoredUsers[currentUserIndex];

    this.chatUserName = currentUserInfo.fullName;

    // Accessing stored value in html page
    const chatManagementData = localStorage.getItem('chatManagementStorage');
    this.user = chatManagementData != null ? JSON.parse(chatManagementData) : [];
  }

  send() {
    const userMessage = (document.getElementById("newFullName") as HTMLInputElement).value;

    // Creating new object to store in chat Management storage
    const chatDetailsList: IChatManagement = {
      chatId: Number(new Date()),
      id: this.currentUserID,
      'TimeStamp': new Date(),
      'userName': this.chatUserName,
      'message': userMessage
    };

    // Pushing object into chat Management storage
    this.getItemFromLocalStorage = JSON.parse(localStorage.getItem('chatManagementStorage')!);
    this.userChatList = this.getItemFromLocalStorage ? this.getItemFromLocalStorage : []; // ternary operator
    this.userChatList.push(chatDetailsList);
    localStorage.setItem("chatManagementStorage", JSON.stringify(this.userChatList));
    this.ngOnInit();

  }

  scrollToDown() {
    let ele = document.getElementById('chatDiv');
    ele.scrollTop = ele.scrollHeight;
  }
}
