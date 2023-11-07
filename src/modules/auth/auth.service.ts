import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { Password } from "src/untils";
import { User, LoginBody, NewUser } from 'src/graphql.schema';

@Injectable()
export class AuthService {
  constructor( private prisma: PrismaService, private readonly jwtService: JwtService) {}

  /**
   * @function login
   * @description Login
   */
  public async login(param: LoginBody): Promise<{ access_token: string }> {
    const { userName, email } = param;
    const user: User | null = await this.prisma.user.findUnique({
      where: { userName: userName, email: email },
    });

    if (!user) throw new AppException(ErrorCode.E101001);

    const checkPwd = await Password.check(user.password, param.password);
    if (!checkPwd) throw new AppException(ErrorCode.E101002);

    // TODO: Check device, check IP.

    const payload = {id: user?.id, userName: user?.userName }
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }

  /**
   * @function register
   * @description Register
   */
  async signup(param: { signup: NewUser }) {
    return param
  }

  /**
   * @function logout
   * @description Logout
   */
  public async logout(): Promise<any> {
    // TODO: handle logout logic
    return null;
  }
}
