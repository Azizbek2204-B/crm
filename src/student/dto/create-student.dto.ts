export class CreateStudentDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hashed_password: string;
  is_active: boolean;
  gender: "Male" | "Female";
  date_of_birth: Date;
  avatar_url: string;
  hashed_refresh_token: string;
}
