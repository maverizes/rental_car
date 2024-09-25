import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ValidationError } from "class-validator";

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        console.log(exception)

        const requestTime = new Date().toISOString();

        if(exception instanceof ValidationError){
            console.log(exception, 'exception');
            return response.status(404).json({
                message: 'Validation Error',
                requestTime,
                url: request.url,
                errorName: 'Validation Error',
                statusCode: 404,
            });
        }

        if(exception instanceof HttpException){
            return response.status(exception.getStatus()).json({
                message: exception.message,
                requestTime,
                url: request.url,
                errorName: exception.name,
                statusCode: exception.getStatus(),
            });
        }else{
            return response.status(500).json({
                message: exception?.message || 'Interval server error',
                requestTime,
                url: request.url,
                errorName: exception?.name,
                statusCode: 500,
            });
        }
    }
}
