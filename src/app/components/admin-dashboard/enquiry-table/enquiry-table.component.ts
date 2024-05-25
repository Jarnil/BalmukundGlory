import { Component } from '@angular/core';
import { EnquiryService } from '../../../services/enquiry.service';
import { EnquiryList } from '../../../interface/Enquiry';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-enquiry-table',
  templateUrl: './enquiry-table.component.html',
  styleUrl: './enquiry-table.component.css',
})
export class EnquiryTableComponent {
  enquiries: any;
  totalRecords: any;
  totalPages: any;
  currentPage: any;
  pageSize: any;
  dateRange!: Date[];
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
        this.totalRecords = response.data.totalCount;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        this.pageSize = response.data.pageSize;
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
    this.getEnquiryList();
  }

  onPageChange(event: any) {
    this.enquiryList.pageNo = event.first / event.rows + 1;
    this.enquiryList.pageSize = event.rows;
    console.log(this.enquiryList);
    this.getEnquiryList();
  }

  deleteEnquiry(id: number): void {
    this.enquiryService.deleteEnquiry(id).subscribe(
      (response) => {
        console.log('Delete response:', response);
        this.getEnquiryList();
        this.messageService.add({
          severity: 'success',
          summary: 'Enquiry Deleted.',
          detail: 'Enquiry Deleted Successfully.',
        });
      },
      (error) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'Something went wrong while deleting enquiry!',
        });
      }
    );
  }

  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.deleteEnquiry(id);
      },
      reject: () => {},
    });
  }
  exportexcel(): void {
    let element = document.getElementById('enquiriestable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString('en-GB')
      .split('/')
      .join('');
    const updatedFileName = `Enquiries_${formattedDate}.xlsx`;

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, updatedFileName);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Exported successfully!',
    });
  }
}
