import { authKey as Authorization, baseUri, EDIT_POST } from '../helpers'

export function editPost({ title, body, id }) {
  return async dispatch => {
    try {
      const rqPayload = { method: 'put', headers: { Authorization },
        body: JSON.stringify({ title, body })
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
