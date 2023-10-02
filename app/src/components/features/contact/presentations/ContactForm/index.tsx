import { useRefetchContacts } from "@/utils";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

export type ContactFormValues = {
  name: string;
  email: string;
};

type Props = {
  onSubmit?: (values?: ContactFormValues) => void;
  initialValues?: ContactFormValues;
};

export function ContactForm(props: Props) {
  const submitHandle = async () => {
    console.log("Submit Handle");
    props.onSubmit?.(form.values);
  };

  const form = useForm<ContactFormValues>({
    initialValues: props.initialValues,
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
