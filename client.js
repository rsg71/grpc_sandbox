const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('proto/service.proto');
const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

const PORT = 50051
const client = new usersProto.UserService(`127.0.0.1:${PORT}`, grpc.credentials.createInsecure());

client.GetUser({ userId: "1" }, (error, response) => {
  if (error) {
    console.error('error getting user from client: ', error);
  } else {
    console.log('User response:', response);
  }
});