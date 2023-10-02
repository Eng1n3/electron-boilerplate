import { DefaultTable } from "@/components";
import React from "react";

type Props = {};

export function ContactBook({}: Props) {
  const [contacts, setContacts] = React.useState<any[]>([
    { name: "", email: "", id: "" },
  ]);
  React.useEffect(() => {
    const fetchData = async () => {
      return await (global as any).contact.getContact();
    };

    fetchData()
      .then((res) => {
        setContacts(res?.data);
        console.log("response aja", res);
      })
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <DefaultTable
      minWidth={340}
      sameWidthColumns
      columns={[
        { accessor: "name", title: "Name" },
        { accessor: "email", title: "Email" },
      ]}
      // records={contacts?.map((v) => v)}
      records={contacts ?? [{ name: "", email: "", id: "" }]}
    />
  );
}
