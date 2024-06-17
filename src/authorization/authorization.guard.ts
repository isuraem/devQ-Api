// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { expressJwtSecret } from 'jwks-rsa';
// import { promisify } from 'util';
// var { expressjwt: jwt } = require("express-jwt");
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Injectable()
// export class AuthorizationGuard implements CanActivate {
//   private AUTH0_AUDIENCE: string;
//   private AUTH0_DOMAIN: string;

//   constructor(private configService: ConfigService){
//     this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE');
//     this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN')
//   }
//   async canActivate(context: ExecutionContext): Promise<boolean>  {
//     const req = context.getArgByIndex(0);
//     const res = context.getArgByIndex(1);

//     const checkJwt = promisify(
//       jwt({
//       secret: expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`
//       }),
//       audience: this.AUTH0_AUDIENCE,
//       issuer: this.AUTH0_DOMAIN,
//       algorithms: ['RS256']

//     })
//   );
//     try{
//      await checkJwt(req,res);
//      console.log('JWT successfully verified');
//       // Extract sub from the decoded token
//       const accessToken = req.headers.authorization.split(' ')[1];
//       const decodedToken = jwt.decode(accessToken) as any;

//       if (decodedToken.sub.includes("@clients")) {
//         decodedToken.sub = "admin|662a8827cf0c1f3feb254124";
//       }

//       // Attach sub to the request for later use
//       req.user = {
//        sub: decodedToken.sub,
//        permissions: decodedToken.permissions || []  // Ensure permissions are assigned even if they are absent
//      };

//      return true
//     } catch(error){
//       console.error('JWT verification failed:', error);
//       throw new UnauthorizedException(error)
//     }
//   }
// }
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt as jwt } from "express-jwt";
import * as jsonwebtoken from 'jsonwebtoken'; // Import jsonwebtoken library
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get<string>('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = this.configService.get<string>('AUTH0_DOMAIN');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`
        }) as GetVerificationKey, // Type assertion to ensure correct type
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256']
      })
    );

    try {
      await checkJwt(req, res);
      console.log('JWT successfully verified');

      // Extract sub from the decoded token
      const accessToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jsonwebtoken.decode(accessToken) as any;

      if (decodedToken.sub.includes("@clients")) {
        decodedToken.sub = "admin|662a8827cf0c1f3feb254124";
      }

      // Attach sub to the request for later use
      req.user = {
        sub: decodedToken.sub,
        permissions: decodedToken.permissions || [] // Ensure permissions are assigned even if they are absent
      };

      return true;
    } catch (error) {
      console.error('JWT verification failed:', error);
      throw new UnauthorizedException(error);
    }
  }
}
