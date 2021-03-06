import { headers, baseUri, DELETE_COMMENT } from '../helpers'

export function deleteComment(id) {
  return async dispatch => {
    try {
      const payload = await (await fetch(`${baseUri}/comments/${id}`, {
        method: 'delete',
        headers
      })).json()
      dispatch({
        type: DELETE_COMMENT,
        payload
      })
    } catch (err) {
      console.log('deleteComment error', err)
    }
  }
}
