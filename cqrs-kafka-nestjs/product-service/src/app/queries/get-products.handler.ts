
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";

import { readDb } from "../product.store";
import { GetProductQuery } from "./get-products.queries";

@QueryHandler(GetProductQuery)
export class GetProductsHandler implements 
IQueryHandler<GetProductQuery>{
    async execute (){
        return readDb;
    }}