import express from "express";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  shipping_address: string;
  is_admin: boolean;
}
export interface ExtendedRequest extends express.Request {
  user?: User;
}
