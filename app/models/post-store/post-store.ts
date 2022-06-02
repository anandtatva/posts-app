import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PostApi } from "../../services/api/post-api";
import { withEnvironment } from "../extensions/with-environment"
import { PostModel, PostSnapshot } from "../post/post"

/**
 * Model description here for TypeScript hints.
 */
export const PostStoreModel = types
  .model("PostStore")
  .props({
    posts: types.optional(types.array(PostModel), [])
  })
  .extend(withEnvironment)
  .actions((self) => ({
    savePost: (postSnapshots: PostSnapshot[], page: number) => {
      if(!page) 
        self.posts.clear()
      self.posts.replace(self.posts.concat(postSnapshots))
    },
  }))
  .actions((self) => ({
    getPosts: async (page: number): Promise<{
      status: boolean, 
      page: number, 
      nbPages:number
    }> => {
      const postsApi = new PostApi(self.environment.api)
      const result = await postsApi.getPosts(page)

      if (result.kind === "ok") {
        self.savePost(result.posts, result.page)
        return {status:true, page:result.page, nbPages: result.nbPages}
      } else {
        __DEV__ && console.tron.log(result.kind)
        return {status:false, page, nbPages:page}
      }
    },
  }));
type PostStoreType = Instance<typeof PostStoreModel>
export interface PostStore extends PostStoreType {}
type PostStoreSnapshotType = SnapshotOut<typeof PostStoreModel>
export interface PostStoreSnapshot extends PostStoreSnapshotType {}
export const createPostStoreDefaultModel = () => types.optional(PostStoreModel, {})
