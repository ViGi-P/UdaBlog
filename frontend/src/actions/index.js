import { TOGGLE_SPIN } from '../helpers'

export * from './getCategories'

export * from './getPosts'
export * from './selectPost'
export * from './addPost'
export * from './editPost'
export * from './deletePost'

export * from './getComments'
export * from './selectComment'
export * from './addComment'
export * from './editComment'
export * from './deleteComment'

export const toggleSpin = (payload = false) => {
  return { type: TOGGLE_SPIN, payload }
}
