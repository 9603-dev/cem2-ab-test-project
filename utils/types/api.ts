import { NextApiRequest } from 'next';

export interface ReturnMessage {
  code: number;
  message: string;
}

export interface RequestWithFile extends NextApiRequest {
  files: any[];
}
