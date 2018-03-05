import { headers, baseUri, EDIT_COMMENT } from '../helpers'

export function editComment(id, data) {
  return async dispatch => {
    try {
      const rqPayload = { method: 'put', headers,
        body: JSON.stringify(data)
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
