export interface Enquiry {
  name: string;
  contactNumber: string;
  email: string;
  occupation: string;
  address: string;
  requirement: Array<String>;
}

export interface EnquiryList {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  columnSearchValue: {
    searchName: string;
    searchContactNumber: string;
    searchEmail: string;
    searchOccupation: string;
    searchAddress: string;
    searchRequirement: string;
    startDate: string;
    endDate: string;
  };
}
