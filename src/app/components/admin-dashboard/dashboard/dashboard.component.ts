import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../../services/enquiry.service';
import { EnquiryList } from '../../../interface/Enquiry';
import { MessageService } from 'primeng/api';
import { Console } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  enquiries: any;

  enquiryList: EnquiryList = {
    pageNo: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'asc',
    columnSearchValue: {
      searchName: '',
      searchContactNumber: '',
      searchEmail: '',
      searchAddress: '',
      searchOccupation: '',
      searchRequirement: '',
      startDate: '',
      endDate: '',
    },
  };

  constructor(
    private enquiryService: EnquiryService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getEnquiryList();
  }

  getEnquiryList() {
    this.enquiryService.getEnquiries(this.enquiryList).subscribe(
      (response) => {
        this.enquiries = response.data.data;
      },
      (error) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail:
            'Something went wrong while fetching enquiry list. Please try again!',
        });
      }
    );
  }

  getColor(requirement: string): any {
    switch (requirement.toLowerCase()) {
      case '2bhk':
        return {
          background: '#427D9D',
        };
      case '3bhk':
        return {
          background: '#164863',
        };
      case 'shop':
        return {
          background: '#3876BF',
        };
    }
  }

  onReset() {
    console.log('reset');
    // this.getEnquiryList();
  }
}
