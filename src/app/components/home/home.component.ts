import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../services/home.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataList: any;
  recordId: string;
  showGetId: boolean;
  record: any;
  newRecord: any;
  createRecord: boolean;
  successMsg: string;
  updateBtn: boolean;
  createBtn: boolean;

  constructor(private homeService: HomeService) {

  }

  ngOnInit() {
    this.showGetId= false;
    this.createRecord = false;
  }

  getAll() {
    this.homeService.getAll().subscribe((data: any) => {
      this.dataList = data;
      if(this.dataList.length === 0){
        this.successMsg = "There are no records";
      }
    });
  }

  createEmpty(){
    this.newRecord = {
    };

    this.createBtn = true;
    this.updateBtn = false;
    this.createRecord = true;
  }
  create(){
    this.homeService.create(this.newRecord).subscribe((data) => {
      this.successMsg = data.message;
      this.createRecord = data.flag;
      if(!data.flag) {
        this.getAll();
      }
    });
  }

  getId(){
    this.showGetId = true;
  }

  getById(){
    console.log(this.recordId);
    if(this.recordId){
      this.homeService.getById(this.recordId).subscribe((data:any) => {
          this.successMsg = data.message;
          this.record = data;
      });
    }
  }

  deleteById(recordId){
    this.homeService.deleteById(recordId).subscribe(() =>{
      this.successMsg = recordId.message;
      this.getAll();
    });
  }

  editRecord(record){
    this.createBtn = false;
    this.newRecord = record;
    this.createRecord = true;
    this.updateBtn = true;
  }

  update(record){
    this.homeService.updateById(record._id, record).subscribe((data) =>{
      this.successMsg = data.message;
      this.createRecord = data.flag;
      this.getAll();
    });
  }
}
