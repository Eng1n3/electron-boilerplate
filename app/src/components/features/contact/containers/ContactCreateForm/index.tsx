// import { useRefetchContacts } from "@/utils";
// import React from "react";
// import { ContactForm, ContactFormValues } from "../../presentations";

// type Props = {};

// export function ContactCreateForm({}: Props) {
//   const foo = useRefetchContacts((state) => state);
//   const createForm = async (values?: ContactFormValues) => {
//     console.log("create contact with values:", values);
//     if (values) {
//       await global.contact.createContact(values);
//       console.log("create contact success");
//       foo?.refetch();
//     }
//   };

//   return <ContactForm onSubmit={createForm} />;
// }

import { useRefetchContacts } from "@/utils";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

export type ContactFormValues = {
  name: string;
  email: string;
};

type Props = {};

export function ContactForm(props: Props) {
  const submitHandle = async () => {
    await global.contact.createContact(form.values);
    console.log("Submit Handle");
  };

  const form = useForm<ContactFormValues>({
    initialValues: {
      email: "",
      name: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Box maw={340}>
      <form onSubmit={submitHandle}>
        <Stack spacing={12}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Enter the contact email"
            radius="md"
            size="sm"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Nama"
            placeholder="Enter the contact name"
            radius="md"
            size="sm"
            {...form.getInputProps("name")}
          />

          <Group spacing="flex-end" mt={8}>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                submitHandle();
              }}
            >
              Add Contact
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}
