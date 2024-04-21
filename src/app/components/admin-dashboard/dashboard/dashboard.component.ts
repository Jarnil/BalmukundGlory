import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../../services/enquiry.service';
import { EnquiryList } from '../../../interface/Enquiry';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  enquiryList: EnquiryList = {
    pageNo: 0,
    pageSize: 10,
    sortBy: '',
    sortOrder: '',
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
        console.log('Received response:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Brochure downloaded.',
          detail:
            'We appreciate your interest and will respond to your enquiry promptly.',
        });
      },
      (error) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail:
            'Something went wrong while adding enquiry. Please try again!',
        });
      }
    );
  }
}
