export enum Role {
  USER = "USER",
  CARETAKER = "CARETAKER",
  ADMIN_WARDEN = "ADMIN_WARDEN",
  ADMIN = "ADMIN",
}

export const roleDisplayNames = {
  USER: "User",
  CARETAKER: "Caretaker",
  ADMIN_WARDEN: "Admin Warden",
  ADMIN: "Admin",
};

export const rolesArray = Object.values(Role);
