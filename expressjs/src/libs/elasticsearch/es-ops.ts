import { ErrorUtils } from "../../utils/error-utils";
import { EsClientInstance } from "./es-client";

class EsOps {
    private static instance: EsOps;

    private constructor() {
        console.log("EsOps init");
        if(EsOps.instance) {
            ErrorUtils.throwError(
                new Error("Error - already initialized")
            );
        }
    }

    async create(
        index: string,
        document: any,
    ): Promise<any> {
        try {
            const result = await EsClientInstance.client.index({
                index: index,
                document: document
            });
            // here we are forcing an index refresh, otherwise we will not
            // get any result in the consequent search
            await EsClientInstance.client.indices.refresh({ index: index });
            return result;
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    /**
     * @param index - index name.
     * @param query - the query object ex.
     *                query: {
                        match: { quote: 'winter' }
                      }
     */
    async search(
        index: string,
        query: any,
    ): Promise<any> {
        try {
            const result = await EsClientInstance.client.search({
                index: index,
                query: query
            });
            // here we are forcing an index refresh, otherwise we will not
            // get any result in the consequent search
            await EsClientInstance.client.indices.refresh({ index: index });
            return result;
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    static getInstance(): EsOps {
        EsOps.instance = EsOps.instance || new EsOps();
        return EsOps.instance;
    }
}

export const EsOpsInstance = EsOps.getInstance();