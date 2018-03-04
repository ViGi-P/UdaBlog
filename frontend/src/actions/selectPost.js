import { SELECT_POST } from '../helpers'

export const selectPost = (payload = null) => {
  return {
    type: SELECT_POST,
    payload
  }
}
