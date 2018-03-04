import { GET_COMMENTS, SELECT_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../helpers'

const INIT_STATE = {
  selected: null,
  comments: []
}

export default ({ selected, comments } = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS: return { selected, comments: payload }
    case SELECT_COMMENT: return { selected: payload, comments }
    case ADD_COMMENT: return { selected: INIT_STATE.selected, comments: [payload, ...comments] }
    case EDIT_COMMENT: return { selected: payload, comments: comments.map(comment => comment.id === payload.id ? payload : comment) }
    case DELETE_COMMENT: return { ...INIT_STATE, comments: comments.filter(comment => comment.id !== payload.id) }
    default: return { selected, comments }
  }
}
