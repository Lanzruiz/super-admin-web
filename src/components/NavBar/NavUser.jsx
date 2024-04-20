import React from "react";
import DefaultLabel from "./DefaultLabel";

const NavUser = ({ userName, email, role }) => {
  return (
    <section className="flex w-full flex-col gap-1 border-b-2 px-1 py-4">
      <section className="w-full">
        <h1 className="font-bold text-primary">Hello, {userName}</h1>
      </section>
      <section className="w-full text-ellipsis">
        <p className="text-ellipsis text-sm	text-darker_gray">{email}</p>
      </section>
      <section className="w-full">
        <DefaultLabel label={role} />
      </section>
    </section>
  );
};

export default NavUser;
