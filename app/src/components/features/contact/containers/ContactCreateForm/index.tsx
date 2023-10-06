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

// import { useRefetchContacts } from "@/utils";
// import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import React, { useEffect } from "react";
// import { ContactForm } from "../..";

// export type ContactFormValues = {
//   name: string;
//   email: string;
// };

// type Props = {};

// export function ContactCreateForm(props: Props) {
//   const submitHandle = async () => {
//     await global.contact.createContact(methods.values);
//     console.log("Submit Handle");
//   };

//   const methods = useForm<ContactFormValues>({
//     initialValues: {
//       email: "",
//       name: "",
//     },
//     validate: {
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
//     },
//   });

//   return (
//     <Box maw={340}>
//       <ContactForm methods={methods} onSubmit={submitHandle} />
//     </Box>
//   );
// }

import { Box, Container, Group, Paper, Title } from "@mantine/core";

import { useForm } from "@/components/ui";

import { contactFormControllers } from "@/utils/form-controllers/contact";
import { contactFormSchema } from "@/utils/form-validation/contact";
import { ContactFormValues } from "@/types/form-values/contact";
import { useRefetchContacts } from "@/utils";

type Props = {
  onSuccess?: () => void;
};

export function ContactCreateForm(props: Props) {
  const foo = useRefetchContacts((state) => state);
  const createContact = async (values?: ContactFormValues) => {
    console.log("create contact with input values", values);
    if (values) {
      await global.contact.createContact(values);
      console.log("create contact success");
      foo?.refetch();
      props.onSuccess?.();
    }
  };

  const [Form, methods] = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      phoneNumber: 0,
      photo: null,
    },
    schema: contactFormSchema,
    controllers: contactFormControllers,
    onSubmit: async (values, ctx) => {
      console.log(values); // eslint-disable-line no-console
      await createContact(values);
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Box w="100%" maw={700}>
      <Form grid={{ gutter: "xs" }} p={0} />
      <Box mt={25}>
        <Form.Button fullWidth mt="xl" loading={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Form.Button>
      </Box>
    </Box>
  );
}
