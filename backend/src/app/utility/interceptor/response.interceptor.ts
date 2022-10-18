// import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
// import { map, Observable } from "rxjs";

// export class ResponseInterceptor implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
//         return next.handle().pipe(map(data => {
//             const method = context.switchToHttp().getRequest<Request>().method;

//             if (method == 'GET' && !data)
//                 context.switchToHttp().getResponse().status(404);
//             return data;
//         }));
//     }

// }