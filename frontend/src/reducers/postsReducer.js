import { GET_POSTS, SELECT_POST, ADD_POST, EDIT_POST, DELETE_POST } from '../helpers'

const INIT_STATE = {
  selected: null,
  posts: []
}

export default ({ selected, posts } = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_POSTS: return { selected, posts: payload }
    case SELECT_POST: return { posts, selected: payload }
    case ADD_POST: return { ...INIT_STATE, posts: [payload, ...posts] }
    case EDIT_POST: return { selected: payload, posts: posts.map(post => post.id === payload.id ? payload : post) }
    case DELETE_POST: return { ...INIT_STATE, posts: posts.filter(post => post.id !== payload.id) }
    default: return { selected, posts }
  }
}
