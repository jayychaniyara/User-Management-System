import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUploadDocument } from '../iupload-document';

@Component({
  selector: 'app-docs-management',
  templateUrl: './docs-management.component.html',
  styleUrls: ['./docs-management.component.scss']
})
export class DocsManagementComponent implements OnInit {

  uploadForm!: FormGroup;
  getItemFromLocalStorage: any;
  userUploadDocument: any;
  editDocumentForm: any = FormGroup;

  user: IUploadDocument[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.uploadForm = this.fb.group({
      id: new FormControl(''),
      fileDescription: new FormControl('', Validators.required),
      fileUpload: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.editDocumentForm = this.fb.group({
      fileDescription: ['', [Validators.required]]
    })
    // Getting current user id
    const userUploadDocsID = Number(this.route.snapshot.paramMap.get('id'));

    // Accessing the storage
    const allStoredUsers = JSON.parse(localStorage.getItem('uploadDocumentStorage')!);

    // Filtering the documents of perticular user
    const userUploads = allStoredUsers.filter((x: any) => x.id == userUploadDocsID);
    const userUploadsList = JSON.stringify(userUploads);

    // Accessing stored value in html page
    const userUploadData = localStorage.getItem('uploadDocumentStorage');
    this.user = userUploadData != null ? JSON.parse(userUploadsList) : [];

  }

  uploadFile() {
    // Getting current user id
    const currentUserID = Number(this.route.snapshot.paramMap.get('id'));

    // Accessing value from HTML page
    const fileNameUpload = (document.getElementById("chooseFile") as HTMLInputElement).value;

    // Creating new object to store in Upload Docs storage
    const uploadDocumentList: IUploadDocument = {
      uploadId: Number(new Date()),
      id: currentUserID,
      'fileDescription': this.uploadForm.value.fileDescription,
      'fileUpload': fileNameUpload.replace("C:\\fakepath\\", "")
    };

    // Pushing object into Upload Docs storage
    this.getItemFromLocalStorage = JSON.parse(localStorage.getItem('uploadDocumentStorage')!);
    this.userUploadDocument = this.getItemFromLocalStorage ? this.getItemFromLocalStorage : []; // ternary operator
    this.userUploadDocument.push(uploadDocumentList);
    localStorage.setItem("uploadDocumentStorage", JSON.stringify(this.userUploadDocument));
    this.ngOnInit();
  }

  deleteFile() {
    // Getting Upload id from URL
    const userUploadDocsID = Number(this.route.snapshot.paramMap.get('id'));

    // Accessing the storage
    const allStoredUsers = JSON.parse(localStorage.getItem('uploadDocumentStorage')!);

    // Finding index of perticular ID 
    const deleteUserDocsIndex = allStoredUsers.findIndex((x: any) => x.uploadId == userUploadDocsID);
    const userid = allStoredUsers[deleteUserDocsIndex].id;

    // Deleting array of selected user and updating local storage 
    allStoredUsers.splice(deleteUserDocsIndex, 1);
    localStorage.setItem('uploadDocumentStorage', JSON.stringify(allStoredUsers));
    this.router.navigate(['/docsManagemetn', userid]);
    this.ngOnInit()
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  editFile() {
    // Getting Upload id from URL
    const userUploadDocsID = Number(this.route.snapshot.paramMap.get('id'));

    // Accessing the storage 
    const allStoredUsers = JSON.parse(localStorage.getItem('uploadDocumentStorage')!);

    // Getting new value from HTML side
    const newDescription = (document.getElementById("newFileDescription") as HTMLInputElement).value;

    // Finding index of perticular ID 
    const editUserDocsIndex = allStoredUsers.findIndex((x: any) => x.uploadId == userUploadDocsID);
    const userid = allStoredUsers[editUserDocsIndex].id;

    // Finding Object in Array of object via Index 
    const currentUserUploadInfo = allStoredUsers[editUserDocsIndex];

    // Updating Array of object with single object value
    currentUserUploadInfo.fileDescription = newDescription;
    allStoredUsers.currentUserUploadInfo;

    // Updating local storage 
    localStorage.setItem("uploadDocumentStorage", JSON.stringify(allStoredUsers));
    this.router.navigate(['/docsManagemetn', userid]);
    this.ngOnInit();
  }
}
