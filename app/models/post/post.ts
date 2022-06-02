import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PostModel = types
  .model("Post")
  .props({
    title: types.string,
    url: types.maybeNull(types.string), 
    created_at: types.string,
    author: types.string
  })
  

type PostType = Instance<typeof PostModel>
export interface Post extends PostType {}
type PostSnapshotType = SnapshotOut<typeof PostModel>
export interface PostSnapshot extends PostSnapshotType {}
export const createPostDefaultModel = () => types.optional(PostModel, {})
