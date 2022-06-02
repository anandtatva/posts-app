import { PostStoreModel } from "./post-store"

test("can be created", () => {
  const instance = PostStoreModel.create({})

  expect(instance).toBeTruthy()
})
