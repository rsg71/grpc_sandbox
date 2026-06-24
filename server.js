const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const data = require('./data/data');

const packageDefinition = protoLoader.loadSync('proto/service.proto');
const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

const server = new grpc.Server();
const PORT = '50051'



server.addService(usersProto.UserService.service, {
  GetUser: (call, callback) => {
    const user = data.userData[call.request.userId];
    if (user) {
      callback(null, user);
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "User not found" });
    }
  }
});

server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running on port ${PORT}`);
  server.start();
});