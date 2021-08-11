// Copyright (c) Mainflux
// SPDX-License-Identifier: Apache-2.0

// Adapted for Orb project, modifications licensed under MPL v. 2.0:
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package grpc

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/ns1labs/orb/policies"
	"github.com/ns1labs/orb/policies/pb"

	kitot "github.com/go-kit/kit/tracing/opentracing"
	kitgrpc "github.com/go-kit/kit/transport/grpc"
	opentracing "github.com/opentracing/opentracing-go"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ pb.PolicyServiceServer = (*grpcServer)(nil)

type grpcServer struct {
	pb.UnimplementedPolicyServiceServer
	retrievePolicy           kitgrpc.Handler
	retrievePoliciesByGroups kitgrpc.Handler
	inactivateDataset        kitgrpc.Handler
}

// NewServer returns new PolicyServiceServer instance.
func NewServer(tracer opentracing.Tracer, svc policies.Service) pb.PolicyServiceServer {
	return &grpcServer{
		retrievePolicy: kitgrpc.NewServer(
			kitot.TraceServer(tracer, "retrieve_policy")(retrievePolicyEndpoint(svc)),
			decodeRetrievePolicyRequest,
			encodePolicyResponse,
		),
		retrievePoliciesByGroups: kitgrpc.NewServer(
			kitot.TraceServer(tracer, "retrieve_policies_by_groups")(retrievePoliciesByGroupsEndpoint(svc)),
			decodeRetrievePoliciesByGroupRequest,
			encodePolicyListResponse,
		),
		inactivateDataset: kitgrpc.NewServer(
			kitot.TraceServer(tracer, "inactivate_dataset")(inactivateDataset(svc)),
			decodeInactivateDatasetByGroupRequest,
			encodeInactivateDatasetResponse,
		),
	}
}

func (gs *grpcServer) RetrievePoliciesByGroups(ctx context.Context, req *pb.PoliciesByGroupsReq) (*pb.PolicyListRes, error) {
	_, res, err := gs.retrievePoliciesByGroups.ServeGRPC(ctx, req)
	if err != nil {
		return nil, encodeError(err)
	}

	return res.(*pb.PolicyListRes), nil
}

func (gs *grpcServer) RetrievePolicy(ctx context.Context, req *pb.PolicyByIDReq) (*pb.PolicyRes, error) {
	_, res, err := gs.retrievePolicy.ServeGRPC(ctx, req)
	if err != nil {
		return nil, encodeError(err)
	}

	return res.(*pb.PolicyRes), nil
}

func (gs *grpcServer) InactivateDataset(ctx context.Context, req *pb.DatasetByGroupReq) (*empty.Empty, error) {
	_, res, err := gs.inactivateDataset.ServeGRPC(ctx, req)
	if err != nil {
		return nil, encodeError(err)
	}
	return res.(*empty.Empty), nil
}

func decodeRetrievePolicyRequest(_ context.Context, grpcReq interface{}) (interface{}, error) {
	req := grpcReq.(*pb.PolicyByIDReq)
	return accessByIDReq{PolicyID: req.PolicyID, OwnerID: req.OwnerID}, nil
}

func decodeInactivateDatasetByGroupRequest(_ context.Context, grpcReq interface{}) (interface{}, error) {
	req := grpcReq.(*pb.DatasetByGroupReq)
	return accessByGroupAndOwnerID{GroupID: req.GroupID, OwnerID: req.OwnerID}, nil
}

func decodeRetrievePoliciesByGroupRequest(_ context.Context, grpcReq interface{}) (interface{}, error) {
	req := grpcReq.(*pb.PoliciesByGroupsReq)
	return accessByGroupIDReq{GroupIDs: req.GroupIDs, OwnerID: req.OwnerID}, nil
}

func encodePolicyResponse(_ context.Context, grpcRes interface{}) (interface{}, error) {
	res := grpcRes.(policyRes)
	return &pb.PolicyRes{
		Id:      res.id,
		Name:    res.name,
		Backend: res.backend,
		Version: res.version,
		Data:    res.data,
	}, nil
}

func encodePolicyListResponse(_ context.Context, grpcRes interface{}) (interface{}, error) {
	res := grpcRes.(policyListRes)

	plist := make([]*pb.PolicyRes, len(res.policies))
	for i, p := range res.policies {
		plist[i] = &pb.PolicyRes{Id: p.id, Name: p.name, Data: p.data, Backend: p.backend, Version: p.version}
	}
	return &pb.PolicyListRes{Policies: plist}, nil
}

func encodeInactivateDatasetResponse(_ context.Context, grpcRes interface{}) (interface{}, error) {
	return &empty.Empty{}, nil
}

func encodeError(err error) error {
	switch err {
	case nil:
		return nil
	case policies.ErrMalformedEntity:
		return status.Error(codes.InvalidArgument, "received invalid can access request")
	case policies.ErrInactivateDataset:
		return status.Error(codes.NotFound, "failed to inactivate dataset")
	default:
		return status.Error(codes.Internal, "internal server error")
	}
}
