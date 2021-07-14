interface ICreateLogErrors {
   message: string;
   stack: string | undefined;
   errorLocation: string;
   statusCode: number;
}

export { ICreateLogErrors };
