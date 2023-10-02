import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

type Props = {};

export function ContactForm({}: Props) {
  const submitHandle = async () => {
    const dapobud = await global.contact.createContact(form.values);
    console.log("handle submit", dapobud);
  };

  const form = useForm({
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
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <Button type="submit" onClick={submitHandle}>
              Add Contact
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}
