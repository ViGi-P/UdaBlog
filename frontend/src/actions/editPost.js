import { headers, baseUri, EDIT_POST } from '../helpers'

export function editPost(id, data) {
  return async dispatch => {
    try {
      const rqPayload = { method: 'PUT', headers,
        body: JSON.stringify(data)
      }
      const payload = await (await fetch(`${baseUri}/posts/${id}`, rqPayload)).json()
      dispatch({
        type: EDIT_POST,
        payload
      })
    } catch (err) {
      console.log('editPost error', err)
    }
  }
}
