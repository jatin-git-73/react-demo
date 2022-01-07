export interface EducationDetails {
  course_name: string;
  university_name: string;
  grade: string;
  last_date: string;
}
export interface Experience {
  company_name: string;
  designation: string;
  department: string;
  ctc: number;
  join_date: Date;
  last_date: Date;
}

export interface EducationDetailsError {
  course_name: string;
  university_name: string;
  grade: string;
  last_date: string;
  failed: boolean;
}
export interface ExperienceDetailsError {
  failed: boolean;
  company_name: string;
  designation: string;
  department: string;
  ctc: string;
  join_date: string;
  last_date: string;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  phone: string;
  email: string;
  designation: string;
  department: string;
  photo: string;
  education: EducationDetails[];
  experience: Experience[];
  company_name: string;
  ctc: number;
  join_date: Date;
  exp_year: number;
  exp_month: number;
  skills: string[];
  account_number: string;
  ifsc_code: string;
  pan_number: string;
  aadhar_number: string;
}

export type EmployeeNodeVaule = number | string | Date | null;

export type pageTypes = "list" | "form";
export interface IAppState {
  employees: Employee[]; //list of employees
  cur_page: pageTypes; //to dicide page
  selected_employee: Employee; //to perform add edit
  cur_step: number;
}

export interface EmpFormProps {
  errors: object;
}

export interface CurrentStatusError {
  failed: boolean;
  company_name: string;
  designation: string;
  department: string;
  ctc: string;
  join_date: string;
}

export interface ProfessionDetailsError {
  failed: boolean;
  exp_year: string;
  exp_month: string;
  skills: string;
}

export interface PersonalDetailsError {
  failed: boolean;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
}

export interface BankDetailsError {
  failed: boolean;
  account_number: string;
  ifsc_code: string;
  pan_number: string;
  aadhar_number: string;
}
export interface ValidationError{
    failed:boolean
}