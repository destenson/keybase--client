// @flow

// This file is auto-generated by client/protocol/Makefile.
import * as gregor1 from './flow-types-gregor'

import engine from '../../engine'
import type {$Exact} from './more'
export type int = number
export type int64 = number
export type uint = number
export type uint64 = number
export type long = number
export type double = number
export type bytes = any
export type RPCError = {
  code: number,
  desc: string
}
export type WaitingHandlerType = (waiting: boolean, method: string, sessionID: number) => void

// $FlowIssue we're calling an internal method on engine that's there just for us
const engineRpcOutgoing = (...args) => engine()._rpcOutgoing(...args)

type requestCommon = {
  waitingHandler?: WaitingHandlerType,
  incomingCallMap?: any,
}

type requestErrorCallback = {
  callback?: ?(err: ?any) => void
}

type RPCErrorHandler = (err: RPCError) => void

type CommonResponseHandler = {
  error: RPCErrorHandler,
  result: (...rest: Array<void>) => void,
}
export const CommonMessageType = {
  none: 0,
  text: 1,
  attachment: 2,
  edit: 3,
  delete: 4,
  metadata: 5,
}

export const CommonTopicType = {
  none: 0,
  chat: 1,
  dev: 2,
}

export function remoteGetInboxRemoteRpc (request: $Exact<requestCommon & {callback?: ?(err: ?any, response: remoteGetInboxRemoteResult) => void} & {param: remoteGetInboxRemoteRpcParam}>) {
  engineRpcOutgoing({...request, method: 'remote.getInboxRemote'})
}

export function remoteGetMessagesRemoteRpc (request: $Exact<requestCommon & {callback?: ?(err: ?any, response: remoteGetMessagesRemoteResult) => void} & {param: remoteGetMessagesRemoteRpcParam}>) {
  engineRpcOutgoing({...request, method: 'remote.getMessagesRemote'})
}

export function remoteGetThreadRemoteRpc (request: $Exact<requestCommon & {callback?: ?(err: ?any, response: remoteGetThreadRemoteResult) => void} & {param: remoteGetThreadRemoteRpcParam}>) {
  engineRpcOutgoing({...request, method: 'remote.getThreadRemote'})
}

export function remoteMarkAsReadRpc (request: $Exact<requestCommon & requestErrorCallback & {param: remoteMarkAsReadRpcParam}>) {
  engineRpcOutgoing({...request, method: 'remote.markAsRead'})
}

export function remoteNewConversationRemoteRpc (request: $Exact<requestCommon & {callback?: ?(err: ?any, response: remoteNewConversationRemoteResult) => void} & {param: remoteNewConversationRemoteRpcParam}>) {
  engineRpcOutgoing({...request, method: 'remote.newConversationRemote'})
}

export function remotePostRemoteRpc (request: $Exact<requestCommon & {callback?: ?(err: ?any, response: remotePostRemoteResult) => void} & {param: remotePostRemoteRpcParam}>) {
  engineRpcOutgoing({...request, method: 'remote.postRemote'})
}

export type Conversation = {
  metadata: ConversationMetadata,
  readerInfo?: ?ConversationReaderInfo,
  maxHeaders?: ?Array<MessageServerHeader>,
}

export type ConversationID = uint64

export type ConversationIDTriple = {
  tlfid: TLFID,
  topicType: TopicType,
  topicID: TopicID,
}

export type ConversationMetadata = {
  idTriple: ConversationIDTriple,
  conversationID: ConversationID,
}

export type ConversationReaderInfo = {
  mtime: gregor1.Time,
  readMsgid: MessageID,
  maxMsgid: MessageID,
}

export type EncryptedData = {
  v: int,
  e: bytes,
  n: bytes,
}

export type InboxView = {
  conversations?: ?Array<Conversation>,
  pagination?: ?Pagination,
}

export type MessageBoxed = {
  serverHeader?: ?MessageServerHeader,
  clientHeader: MessageClientHeader,
  headerSignature: SignatureInfo,
  bodyCiphertext: EncryptedData,
  bodySignature: SignatureInfo,
  keyGeneration: int,
}

export type MessageClientHeader = {
  conv: ConversationIDTriple,
  tlfName: string,
  messageType: MessageType,
  prev?: ?Array<MessagePreviousPointer>,
  sender: gregor1.UID,
  senderDevice: gregor1.DeviceID,
}

export type MessageID = uint

export type MessagePreviousPointer = {
  id: MessageID,
  hash: bytes,
}

export type MessageServerHeader = {
  messageType: MessageType,
  messageID: MessageID,
  sender: gregor1.UID,
  senderDevice: gregor1.DeviceID,
  supersededBy: MessageID,
  ctime: gregor1.Time,
}

export type MessageType = 
    0 // NONE_0
  | 1 // TEXT_1
  | 2 // ATTACHMENT_2
  | 3 // EDIT_3
  | 4 // DELETE_4
  | 5 // METADATA_5

export type NewMessagePayload = {
  Action: string,
  convID: ConversationID,
  message: MessageBoxed,
}

export type Pagination = {
  next: bytes,
  previous: bytes,
  num: int,
  last: boolean,
}

export type SignatureInfo = {
  v: int,
  s: bytes,
  k: bytes,
}

export type TLFID = bytes

export type ThreadID = bytes

export type ThreadViewBoxed = {
  messages?: ?Array<MessageBoxed>,
  pagination?: ?Pagination,
}

export type TopicID = bytes

export type TopicType = 
    0 // NONE_0
  | 1 // CHAT_1
  | 2 // DEV_2

export type remoteGetInboxRemoteRpcParam = $Exact<{
  pagination?: ?Pagination
}>

export type remoteGetMessagesRemoteRpcParam = $Exact<{
  conversationID: ConversationID,
  messageIDs?: ?Array<MessageID>
}>

export type remoteGetThreadRemoteRpcParam = $Exact<{
  conversationID: ConversationID,
  markAsRead: boolean,
  pagination?: ?Pagination
}>

export type remoteMarkAsReadRpcParam = $Exact<{
  conversationID: ConversationID,
  msgID: MessageID
}>

export type remoteNewConversationRemoteRpcParam = $Exact<{
  idTriple: ConversationIDTriple
}>

export type remotePostRemoteRpcParam = $Exact<{
  conversationID: ConversationID,
  messageBoxed: MessageBoxed
}>

type remoteGetInboxRemoteResult = InboxView

type remoteGetMessagesRemoteResult = ?Array<MessageBoxed>

type remoteGetThreadRemoteResult = ThreadViewBoxed

type remoteNewConversationRemoteResult = ConversationID

type remotePostRemoteResult = MessageID

export type rpc =
    remoteGetInboxRemoteRpc
  | remoteGetMessagesRemoteRpc
  | remoteGetThreadRemoteRpc
  | remoteMarkAsReadRpc
  | remoteNewConversationRemoteRpc
  | remotePostRemoteRpc
export type incomingCallMapType = $Exact<{

}>
