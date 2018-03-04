import { GET_CATEGORIES } from '../helpers'

const INIT_STATE = []

export default function(state = INIT_STATE, { type, payload }) {
  switch(type) {
    case GET_CATEGORIES: return payload
    default: return state
  }
}
