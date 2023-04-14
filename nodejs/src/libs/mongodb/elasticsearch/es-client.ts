import { Client } from '@elastic/elasticsearch'
import { ErrorUtils } from "../../utils/error-utils";

class EsClient {
    private static instance: EsClient;
    client: Client;

    private constructor() {
        console.log("EsClient init");
        if(EsClient.instance) {
            ErrorUtils.throwError(
                new Error("Error - already initialized")
            );
        }
    }

    /**
     * @param uri - mongodb uri.
     * @param name - the db name.
     */
    async init(
        uri: string,
        name: string
    ) {
        try {
            this.client = new Client({
                cloud: { id: '<cloud-id>' },
                auth: { apiKey: 'base64EncodedKey' }
            });
        }
        catch(e) {
            this.close();
            ErrorUtils.throwError(e);
        }
    }

    close() {
        this.client.close();
    }

    static getInstance(): EsClient {
        EsClient.instance = EsClient.instance || new EsClient();
        return EsClient.instance;
    }
}

export const EsClientInstance = EsClient.getInstance();