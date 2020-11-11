import {
  EXAMPLE
} from '../actions/example'

const initialState = [
  {
    id: 0,
    text: 'Initial',
  }
]

export default function todos(state = initialState, action: any) {
  switch (action.type) {
    case EXAMPLE:
      return [
        ...state,
        {
          text: action.payload.text
        }
      ]
    default:
      return state
  }
}
