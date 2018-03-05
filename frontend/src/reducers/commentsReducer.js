import { GET_COMMENTS, SELECT_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../helpers'

const INIT_STATE = {
  selected: null,
  commentsArray: []
}

export default ({ selected, commentsArray } = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS: return { selected, commentsArray: payload }
    case SELECT_COMMENT: return { selected: payload === null ? payload : commentsArray.find(({ id }) => payload === id), commentsArray }
    case ADD_COMMENT: return { selected: INIT_STATE.selected, commentsArray: [payload, ...commentsArray] }
    case EDIT_COMMENT: return { selected: payload, commentsArray: commentsArray.map(comment => comment.id === payload.id ? payload : comment) }
    case DELETE_COMMENT: return { ...INIT_STATE, commentsArray: commentsArray.filter(comment => comment.id !== payload.id) }
    default: return { selected, commentsArray }
  }
}
