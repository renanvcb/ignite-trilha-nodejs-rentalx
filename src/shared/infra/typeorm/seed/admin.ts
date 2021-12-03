import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  connection.query(
    `INSERT INTO
    users(id, name, password, email, driver_license, "isAdmin", created_at)
    VALUES('${id}', 'Admin', '${password}', 'admin@rentx.com.br', 'not applicable', 'true', 'now()')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
