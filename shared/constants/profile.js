// @flow
import type {PlatformsExpanded} from '../constants/types/more'
import type {TypedAction} from '../constants/types/flux'

export const editingProfile = 'profile:editingProfile'
export const editedProfile = 'profile:editedProfile'

export const waiting = 'profile:waiting'
export type Waiting = TypedAction<'profile:waiting', {waiting: boolean}, void>

export const updatePlatform = 'profile:updatePlatform'
export type UpdatePlatform = TypedAction<'profile:updatePlatform', {platform: PlatformsExpanded}, void>

export const updateUsername = 'profile:updateUsername'
export type UpdateUsername = TypedAction<'profile:updateUsername', {username: string}, void>

export const maxProfileBioChars = 256

export type Actions = Waiting
  | UpdatePlatform
  | UpdateUsername

export type State = {
  error: ?string,
  waiting: boolean,
  username: string,
  platform: ?PlatformsExpanded,
  usernameValid: boolean,
}
