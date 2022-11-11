export enum Role {
  vendor,
  admin,
}

const rolesMap = new Map<number, string>([
  [Role.vendor, 'VENDOR'],
  [Role.admin, 'ADMIN'],
]);

export { rolesMap };
