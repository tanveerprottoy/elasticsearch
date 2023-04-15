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

    async init(
        node: string,
        cloud?: {
            id: string;
        },
        auth?: any
    ) {
        try {
            if(node) {
                this.client = new Client({
                    node: node
                });
            }
            else {
                // cloud: { id: '<cloud-id>' },
                // auth: { apiKey: 'base64EncodedKey' }
                this.client = new Client({
                    cloud: cloud,
                    auth: auth
                });
            }
            this.client.info()
                .then(response => console.log(response))
                .catch(err => {
                    console.error(err);
                    this.close();
                    ErrorUtils.throwError(err);
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