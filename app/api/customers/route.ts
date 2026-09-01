import { handleGet, handlePost } from "../helper";

export const GET = () => handleGet("customers");
export const POST = (request: Request) => handlePost("customers", request);
