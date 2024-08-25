export interface Mess {
  _id: string;
  name: string;
  hostel: string;
}

// TODO Fix MessPopulated
export type MessPopulated = any;
// export type MessPopulated = RedefineKeyTypes<
//   Mess,
//   {
//     hostel: Pick<Hostel, "_id" | "name">;
//     users: Array<
//       Pick<User, "_id" | "email" | "firstName" | "lastName" | "rollNo">
//     >;
//   }
// >;

// export type MessPopulatedWith<PopulatedKeys extends keyof Mess> = PopulatedWith<
//   Mess,
//   MessPopulated,
//   PopulatedKeys
// >;
