import { headers, baseUri, ADD_COMMENT } from '../helpers'

export function addComment({ parentId, body, author }) {
  return async dispatch => {
    try {
      const rqPayload = { method: 'post', headers,
        body: JSON.stringify({ id: Date.now(), timestamp: Date.now(),
          parentId, body, author
        })
      }
      const payload = await (await fetch(`${baseUri}/comments`, rqPayload)).json()
      dispatch({
        type: ADD_COMMENT,
        payload
      })
    } catch (err) {
      console.log('addComment error', err)
    }
  }
}
