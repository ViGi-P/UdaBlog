import { SELECT_COMMENT } from '../helpers'

export function selectComment(payload = null) {
  return {
    type: SELECT_COMMENT,
    payload
  }
}
