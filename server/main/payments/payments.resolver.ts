import GraphQLJSON from "graphql-type-json";
import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import PaymentsService from "./payments.service";

@Resolver()
export default class PaymentsResolver {
    constructor(private paymentsService: PaymentsService) {
        this.paymentsService = new PaymentsService();
    }

    @Query(() => GraphQLJSON)
    @Authorized()
    getPayments(@Ctx() context: any) {
        return this.paymentsService.getPayments(context.user);
    }
}
