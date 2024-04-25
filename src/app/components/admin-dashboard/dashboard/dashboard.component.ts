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
  dateRange!: Date[];
  enquiryList: EnquiryList = {
    pageNo: 0,
    pageSize: 100,
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
    if (
      this.enquiryList.columnSearchValue.startDate &&
      this.enquiryList.columnSearchValue.endDate
    ) {
      const formattedStartDate = this.formatDate(
        this.enquiryList.columnSearchValue.startDate
      );
      const formattedEndDate = this.formatDate(
        this.enquiryList.columnSearchValue.endDate,
        true
      );

      this.enquiryList.columnSearchValue.startDate = formattedStartDate;
      this.enquiryList.columnSearchValue.endDate = formattedEndDate;
    }

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
          background: '#265073',
        };
      case '3bhk':
        return {
          background: '#818FB4',
        };
      case 'shop':
        return {
          background: '#19A7CE',
        };
    }
  }

  updateDateRange() {
    console.log(this.dateRange);
    if (this.dateRange && this.dateRange.length === 2) {
      // Set start date and end date in the enquiryList object
      this.enquiryList.columnSearchValue.startDate =
        this.dateRange[0].toLocaleDateString();
      this.enquiryList.columnSearchValue.endDate =
        this.dateRange[1].toLocaleDateString();
    } else {
      // Clear start date and end date if range is not selected
      this.enquiryList.columnSearchValue.startDate = '';
      this.enquiryList.columnSearchValue.endDate = '';
    }
  }

  formatDate(dateString: string, isEndDate = false) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = isEndDate ? '23' : '00';
    const minutes = isEndDate ? '59' : '00';
    const seconds = isEndDate ? '59' : '00';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onReset() {
    this.enquiryList = {
      pageNo: 0,
      pageSize: 100,
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
    this.getEnquiryList();
  }
}
