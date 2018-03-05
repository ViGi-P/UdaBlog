import { headers, baseUri, GET_CATEGORIES } from '../helpers'

export function getCategories() {
  return async dispatch => {
    try {
      const { categories } = await fetch(`${baseUri}/categories`, {
        headers
      }).then(res => res.json())
      dispatch({
        type: GET_CATEGORIES,
        payload: categories || []
      })
    } catch (err) {
      console.log('getCategories error', err)
    }
  }
}
