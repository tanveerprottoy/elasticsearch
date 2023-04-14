import { EsOpsInstance } from "../../libs/elasticsearch";

class ElasticSearchService {

    create = async (
        data: any
    ): Promise<any> => {
        const result = await EsOpsInstance.create(
            "user",
            data
        );
        console.log(result);
        return result;
    };

    search = async (
        search: string
    ): Promise<any> => {
        const result = await EsOpsInstance.search(
            "user",
            {
                query: {
                    match: { name: "abc" }
                }
            }
        );
        console.log(result);
        return result;
    };
}

export default new ElasticSearchService;