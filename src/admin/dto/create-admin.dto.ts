export class CreateAdminDto {
    first_name: string;
    last_name: string;
    email: string;
    phone:string;
    hashed_password: string;
    is_creator: boolean
    is_active: boolean
}
