// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: JWT_SECRET,
//       signOptions: {
//         expiresIn: jwtConfig.expiresIn
//       }
//     }),
//     passportModule,
//     TypeOrmModule.forFeature([AuthRepository])],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
//   exports: [passportModule]
// })
export class AuthModule {}
