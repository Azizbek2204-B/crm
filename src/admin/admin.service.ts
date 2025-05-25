import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async updateRefreshToken(adminId: number, hashed_refresh_token: string) {
    await this.adminRepository.update(adminId, { hashed_refresh_token });
  }

  findOne(id: number) {
    return this.adminRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.adminRepository.findOne({ where: { email } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }
}
