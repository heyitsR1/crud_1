// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const req = context.switchToHttp().getRequest();
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader) return false;
    
//     const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
//     const decoded = jwt.verify(token, 'your-secret-key');
//     req.user = decoded;
//     return true;
//   }
// }


