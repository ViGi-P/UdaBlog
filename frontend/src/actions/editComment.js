import { authKey as Authorization, baseUri, EDIT_COMMENT } from '../helpers'

export function editComment({ body, id }) {
  return async dispatch => {
    try {
      const rqPayload = { method: 'put', headers: { Authorization },
        body: JSON.stringify({ body, timestamp: Date.now() })
      }
      const payload = await (await fetch(`${baseUri}/comments/${id}`, rqPayload)).json()
      dispatch({
        type: EDIT_COMMENT,
        payload
      })
    } catch (err) {
      console.log('editComment error', err)
    }
  }
}
