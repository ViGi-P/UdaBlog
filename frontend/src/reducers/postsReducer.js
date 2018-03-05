import { GET_POSTS, SELECT_POST, ADD_POST, EDIT_POST, DELETE_POST } from '../helpers'

const INIT_STATE = {
  selected: null,
  postsArray: []
}

export default ({ selected, postsArray } = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_POSTS: return { selected, postsArray: payload }
    case SELECT_POST: return { postsArray, selected: payload === null ? payload : postsArray.find(({ id }) => payload === id) }
    case ADD_POST: return { ...INIT_STATE, postsArray: [payload, ...postsArray] }
    case EDIT_POST: return { selected: payload, postsArray: postsArray.map(post => post.id === payload.id ? payload : post) }
    case DELETE_POST: return { ...INIT_STATE, postsArray: postsArray.filter(post => post.id !== payload.id) }
    default: return { selected, postsArray }
  }
}
