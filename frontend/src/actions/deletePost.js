import { headers, baseUri, DELETE_POST } from '../helpers'

export function deletePost(id) {
  return async dispatch => {
    try {
      const payload = await (await fetch(`${baseUri}/posts/${id}`, {
        method: 'delete',
        headers
      })).json()
      dispatch({
        type: DELETE_POST,
        payload
      })
    } catch (err) {
      console.log('deletePost error', err)
    }
  }
}
