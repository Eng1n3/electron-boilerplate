import { ContactForm, DefaultLayout, ContactBook } from "@/components";
import { Flex, Grid, Title } from "@mantine/core";


export default function HomePage() {
  return (
    <DefaultLayout>
      
       <Grid gutter="1rem" gutterMd="3rem">

            <Grid.Col span={12} sm={6} md={5}>
              <Title order={2} className="heading3" mb="sm">Add New Contact</Title>
            <ContactForm/>
           </Grid.Col>
        <Grid.Col span={12} sm={6} >
        <Title order={2} className="heading3" mb="sm">Contact List</Title>

            <ContactBook/>
        </Grid.Col>
       </Grid>
    </DefaultLayout>
  );
}