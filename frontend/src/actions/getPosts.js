import { headers, baseUri, GET_POSTS } from '../helpers'

export function getPosts() {
  return async dispatch => {
    try {
      const payload = await (await fetch(`${baseUri}/posts`, {
        headers
      })).json() || ['posts']
      dispatch({
        type: GET_POSTS,
        payload
      })
    } catch (err) {
      console.log('getPosts error', err)
    }
  }
}
