export const environment = {
  production: false,
  environmentName: 'DEV',
  apiUrlRoot: 'https://localhost:7269/api',
  auth: {
    clientId: 'c850a148-0b05-4868-ab0b-4f04b66df001',
    authority: 'https://login.microsoftonline.com/97d05d42-fc66-4adf-913f-d397759b6372',
    access_as_user_scope: 'api://0de01329-010d-4283-bd48-34cad2c07748/access_as_user',
    scopes: {
      user_read: 'user.read',
      access_as_user: 'api://0de01329-010d-4283-bd48-34cad2c07748/access_as_user'
    }
    // scopes: [
    //   // 'user.read',
    //   'api://0de01329-010d-4283-bd48-34cad2c07748/access_as_user'
    // ]
  }
};
