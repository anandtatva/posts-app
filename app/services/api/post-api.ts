import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetPostsResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"


export class PostApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getPosts(page:number): Promise<GetPostsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get("search_by_date?tags=story&page="+ page)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const posts = response.data.hits?.map(({created_at, url, title, author})=>({
        title, 
        author,
        created_at, 
        url, 
      }))
      return { 
        kind: "ok", 
        posts, 
        page: response.data.page, 
        nbPages:response.data.nbPages 
      }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
