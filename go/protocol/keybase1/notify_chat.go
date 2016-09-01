// Auto-generated by avdl-compiler v1.3.6 (https://github.com/keybase/node-avdl-compiler)
//   Input file: avdl/keybase1/notify_chat.avdl

package keybase1

import (
	rpc "github.com/keybase/go-framed-msgpack-rpc"
	context "golang.org/x/net/context"
)

type ChatActivityType int

const (
	ChatActivityType_RESERVED         ChatActivityType = 0
	ChatActivityType_INCOMING_MESSAGE ChatActivityType = 1
)

var ChatActivityTypeMap = map[string]ChatActivityType{
	"RESERVED":         0,
	"INCOMING_MESSAGE": 1,
}

type ChatActivity struct {
	ActivityType    ChatActivityType `codec:"ActivityType" json:"ActivityType"`
	IncomingMessage *Message         `codec:"IncomingMessage,omitempty" json:"IncomingMessage,omitempty"`
}

type NewChatActivityArg struct {
	Uid      UID          `codec:"uid" json:"uid"`
	Activity ChatActivity `codec:"activity" json:"activity"`
}

type NotifyChatInterface interface {
	NewChatActivity(context.Context, NewChatActivityArg) error
}

func NotifyChatProtocol(i NotifyChatInterface) rpc.Protocol {
	return rpc.Protocol{
		Name: "keybase.1.NotifyChat",
		Methods: map[string]rpc.ServeHandlerDescription{
			"NewChatActivity": {
				MakeArg: func() interface{} {
					ret := make([]NewChatActivityArg, 1)
					return &ret
				},
				Handler: func(ctx context.Context, args interface{}) (ret interface{}, err error) {
					typedArgs, ok := args.(*[]NewChatActivityArg)
					if !ok {
						err = rpc.NewTypeError((*[]NewChatActivityArg)(nil), args)
						return
					}
					err = i.NewChatActivity(ctx, (*typedArgs)[0])
					return
				},
				MethodType: rpc.MethodNotify,
			},
		},
	}
}

type NotifyChatClient struct {
	Cli rpc.GenericClient
}

func (c NotifyChatClient) NewChatActivity(ctx context.Context, __arg NewChatActivityArg) (err error) {
	err = c.Cli.Notify(ctx, "keybase.1.NotifyChat.NewChatActivity", []interface{}{__arg})
	return
}
