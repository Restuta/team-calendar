import { createAction as createActionCreator } from 'redux-actions'


//wraps default Action Creator factory to not have identity function be used
// when no payload is provided https://github.com/acdlite/redux-actions/issues/90
const makeActionCreator = (type, payloadCreator, metaCreator) =>
  createActionCreator(type, (payloadCreator || (() => {})), metaCreator)

const makeActionCreatorWithPayload = createActionCreator

/* actions should follow Flux Standard Action https://github.com/acdlite/flux-standard-action

An action MUST
  be a plain JavaScript object.
  have a type property.

An action MAY
  have a error property.
  have a payload property.
  have a meta property.

const fluxStandardAction = {
  type: 'SOME_ACTION',
  payload: {
    data: 'any data'
  },
  //if actions represents an error
  //An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.
  error: true/false,
  //The optional meta property MAY be any type of value. It is intended for any extra information that is not part of the payload.
  meta: {}
}
*/

// action creators

// debug related
export const toggleBaseline = makeActionCreator('Dbg.TOGGLE_BASELINE')
export const toggle3x3Grid = makeActionCreator('Dbg.TOGGLE_3X3_GRID')
export const toggleContainerEdges = makeActionCreator('Dbg.TOGGLE_CONTAINER_EDGES')

// calendar related
export const requestEventsFetch = makeActionCreatorWithPayload('Cal.REQUEST_EVENTS_FETCH')
export const calendarFetchSucceded = makeActionCreatorWithPayload('Cal.CALENDAR_FETCH_SUCCEDED')
export const calendarFetchFailed = makeActionCreatorWithPayload('Cal.CALENDAR_FETCH_FAILED')
export const toggleShowPastEvents = makeActionCreator('Cal.TOGGLE_PAST_EVENTS',
  (calendarId) => ({calendarId})
)

export const setBrowserWidth = makeActionCreator('browser/SET_WIDTH',
  width => ({browserWidth: width})
)

// routing related
import { replace, push, goBack } from 'react-router-redux'

export const openRoutedModal = ({path, hasPadding}) => push({
  pathname: path,
  state: {
    // since react router would use it's own action it would be easier to just
    // differentiate it using those custom stings aka sub-actions
    subActionName: 'Modal.OPEN_ROUTED_MODAL',
    // isOpen has to remain here since routing actions are stored in browser session and during full browser refresh
    // last action is replayed with the entire state, including modal state in this case, all other cases covered with
    // reudux store
    modalProps: { hasPadding: hasPadding, isOpen: true },
  }
})

export const closeRoutedModal = () => goBack()

export const replaceRoutedModal = ({path, hasPadding}) => replace({
  pathname: path,
  state: {
    subActionName: 'Modal.REPLACE_ROUTED_MODAL',
    // isOpen has to remain here since routing actions are stored in browser session and during full browser refresh
    // last action is replayed with the entire state, including modal state in this case, all other cases covered with
    // reudux store
    modalProps: { hasPadding: hasPadding, isOpen: true },
    replacesPrevModal: true,

  }
})
