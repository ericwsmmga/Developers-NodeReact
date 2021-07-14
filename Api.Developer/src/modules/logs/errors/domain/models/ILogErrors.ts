interface ILogErrors {
   id: string;
   message: string;
   stack: string | undefined;
   errorLocation: string;
   statusCode: number;
   created_at: Date;
   updated_at: Date;
   deleted_at: Date;
}

export { ILogErrors };
