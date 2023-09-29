import { DefaultTable } from '@/components'
import React from 'react'

type Props = {}

export function ContactBook({}: Props) {
  return (
   <DefaultTable
   minWidth={340}
   sameWidthColumns
   columns={[
    {accessor: 'name', title: 'Name',},
    {accessor: 'email', title: 'Email'}
   ]}

   records={[
    {name: 'Rijal', email: 'zalghod@gmail.com',  id: '1'},
    {name: 'Rijal', email: 'zalghod@gmail.com', id: '2'},
    {name: 'Rijal', email: 'zalghod@gmail.com',  id: '3'},
   ]}
   
   />
  )
}