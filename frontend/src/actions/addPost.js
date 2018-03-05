import { headers, baseUri, ADD_POST } from '../helpers'

export function addPost({ title, body, author, category }) {
  return async dispatch => {
    try {
      const rqPayload = { method: 'post', headers,
        body: JSON.stringify({ id: `${Date.now()}`, timestamp: Date.now(),
          title, body, author, category
        })
      }
      const payload = await (await fetch(`${baseUri}/posts`, rqPayload)).json()
      dispatch({
        type: ADD_POST,
        payload
      })
    } catch (err) {
      console.log('addPost error', err)
    }
  }
}
