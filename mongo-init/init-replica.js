// 🗄️ MONGODB REPLICA SET INITIALIZATION
// Este script inicializa o replica set para alta disponibilidade

print('🚀 Inicializando MongoDB Replica Set...');

// Configurar replica set
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb:27017" }
  ]
});

print('✅ Replica Set configurado com sucesso!');

// Criar usuário da aplicação
db.createUser({
  user: "clipeiro",
  pwd: "clipeiro2024",
  roles: [
    { role: "readWrite", db: "clipeiro" },
    { role: "dbAdmin", db: "clipeiro" }
  ]
});

print('✅ Usuário da aplicação criado!');

// Criar índices para performance
db = db.getSiblingDB('clipeiro');

// Índices para Users
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });
db.users.createIndex({ "isActive": 1 });

// Índices para OnboardingData
db.onboardingdatas.createIndex({ "userId": 1 }, { unique: true });
db.onboardingdatas.createIndex({ "userEmail": 1 });
db.onboardingdatas.createIndex({ "status": 1 });
db.onboardingdatas.createIndex({ "createdAt": 1 });

print('✅ Índices criados para performance!');
print('🎉 MongoDB configurado com sucesso!');
