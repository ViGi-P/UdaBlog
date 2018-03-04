import { authKey as Authorization, baseUri, GET_COMMENTS } from '../helpers'

export function getComments(postId) {
  return async dispatch => {
    try {
      const payload = await (await fetch(`${baseUri}/posts/${postId}/comments`, {
        headers: { Authorization }
      })).json()
      dispatch({
        type: GET_COMMENTS,
        payload
      })
    } catch (err) {
      console.log('getComments error', err)
    }
  }
}
