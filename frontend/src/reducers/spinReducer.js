import { TOGGLE_SPIN } from '../helpers'

const INIT_STATE = true

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SPIN: return payload
    default: return state
  }
}
