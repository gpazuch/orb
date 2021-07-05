// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.17.3
// source: policies/pb/policies.proto

package pb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type PolicyByIDReq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PolicyID string `protobuf:"bytes,1,opt,name=policyID,proto3" json:"policyID,omitempty"`
	OwnerID  string `protobuf:"bytes,2,opt,name=ownerID,proto3" json:"ownerID,omitempty"`
}

func (x *PolicyByIDReq) Reset() {
	*x = PolicyByIDReq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_policies_pb_policies_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PolicyByIDReq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PolicyByIDReq) ProtoMessage() {}

func (x *PolicyByIDReq) ProtoReflect() protoreflect.Message {
	mi := &file_policies_pb_policies_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PolicyByIDReq.ProtoReflect.Descriptor instead.
func (*PolicyByIDReq) Descriptor() ([]byte, []int) {
	return file_policies_pb_policies_proto_rawDescGZIP(), []int{0}
}

func (x *PolicyByIDReq) GetPolicyID() string {
	if x != nil {
		return x.PolicyID
	}
	return ""
}

func (x *PolicyByIDReq) GetOwnerID() string {
	if x != nil {
		return x.OwnerID
	}
	return ""
}

type PolicyData struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Value []byte `protobuf:"bytes,1,opt,name=value,proto3" json:"value,omitempty"`
}

func (x *PolicyData) Reset() {
	*x = PolicyData{}
	if protoimpl.UnsafeEnabled {
		mi := &file_policies_pb_policies_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PolicyData) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PolicyData) ProtoMessage() {}

func (x *PolicyData) ProtoReflect() protoreflect.Message {
	mi := &file_policies_pb_policies_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PolicyData.ProtoReflect.Descriptor instead.
func (*PolicyData) Descriptor() ([]byte, []int) {
	return file_policies_pb_policies_proto_rawDescGZIP(), []int{1}
}

func (x *PolicyData) GetValue() []byte {
	if x != nil {
		return x.Value
	}
	return nil
}

var File_policies_pb_policies_proto protoreflect.FileDescriptor

var file_policies_pb_policies_proto_rawDesc = []byte{
	0x0a, 0x1a, 0x70, 0x6f, 0x6c, 0x69, 0x63, 0x69, 0x65, 0x73, 0x2f, 0x70, 0x62, 0x2f, 0x70, 0x6f,
	0x6c, 0x69, 0x63, 0x69, 0x65, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x08, 0x70, 0x6f,
	0x6c, 0x69, 0x63, 0x69, 0x65, 0x73, 0x22, 0x45, 0x0a, 0x0d, 0x50, 0x6f, 0x6c, 0x69, 0x63, 0x79,
	0x42, 0x79, 0x49, 0x44, 0x52, 0x65, 0x71, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x6f, 0x6c, 0x69, 0x63,
	0x79, 0x49, 0x44, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x70, 0x6f, 0x6c, 0x69, 0x63,
	0x79, 0x49, 0x44, 0x12, 0x18, 0x0a, 0x07, 0x6f, 0x77, 0x6e, 0x65, 0x72, 0x49, 0x44, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x6f, 0x77, 0x6e, 0x65, 0x72, 0x49, 0x44, 0x22, 0x22, 0x0a,
	0x0a, 0x50, 0x6f, 0x6c, 0x69, 0x63, 0x79, 0x44, 0x61, 0x74, 0x61, 0x12, 0x14, 0x0a, 0x05, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x32, 0x56, 0x0a, 0x0d, 0x50, 0x6f, 0x6c, 0x69, 0x63, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69,
	0x63, 0x65, 0x12, 0x45, 0x0a, 0x12, 0x52, 0x65, 0x74, 0x72, 0x69, 0x65, 0x76, 0x65, 0x50, 0x6f,
	0x6c, 0x69, 0x63, 0x79, 0x44, 0x61, 0x74, 0x61, 0x12, 0x17, 0x2e, 0x70, 0x6f, 0x6c, 0x69, 0x63,
	0x69, 0x65, 0x73, 0x2e, 0x50, 0x6f, 0x6c, 0x69, 0x63, 0x79, 0x42, 0x79, 0x49, 0x44, 0x52, 0x65,
	0x71, 0x1a, 0x14, 0x2e, 0x70, 0x6f, 0x6c, 0x69, 0x63, 0x69, 0x65, 0x73, 0x2e, 0x50, 0x6f, 0x6c,
	0x69, 0x63, 0x79, 0x44, 0x61, 0x74, 0x61, 0x22, 0x00, 0x42, 0x0d, 0x5a, 0x0b, 0x70, 0x6f, 0x6c,
	0x69, 0x63, 0x69, 0x65, 0x73, 0x2f, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_policies_pb_policies_proto_rawDescOnce sync.Once
	file_policies_pb_policies_proto_rawDescData = file_policies_pb_policies_proto_rawDesc
)

func file_policies_pb_policies_proto_rawDescGZIP() []byte {
	file_policies_pb_policies_proto_rawDescOnce.Do(func() {
		file_policies_pb_policies_proto_rawDescData = protoimpl.X.CompressGZIP(file_policies_pb_policies_proto_rawDescData)
	})
	return file_policies_pb_policies_proto_rawDescData
}

var file_policies_pb_policies_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_policies_pb_policies_proto_goTypes = []interface{}{
	(*PolicyByIDReq)(nil), // 0: policies.PolicyByIDReq
	(*PolicyData)(nil),    // 1: policies.PolicyData
}
var file_policies_pb_policies_proto_depIdxs = []int32{
	0, // 0: policies.PolicyService.RetrievePolicyData:input_type -> policies.PolicyByIDReq
	1, // 1: policies.PolicyService.RetrievePolicyData:output_type -> policies.PolicyData
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_policies_pb_policies_proto_init() }
func file_policies_pb_policies_proto_init() {
	if File_policies_pb_policies_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_policies_pb_policies_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PolicyByIDReq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_policies_pb_policies_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PolicyData); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_policies_pb_policies_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_policies_pb_policies_proto_goTypes,
		DependencyIndexes: file_policies_pb_policies_proto_depIdxs,
		MessageInfos:      file_policies_pb_policies_proto_msgTypes,
	}.Build()
	File_policies_pb_policies_proto = out.File
	file_policies_pb_policies_proto_rawDesc = nil
	file_policies_pb_policies_proto_goTypes = nil
	file_policies_pb_policies_proto_depIdxs = nil
}
