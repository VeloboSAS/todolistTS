import  React from 'react';
import { AddItemForm } from './addItemForm'
import {action} from '@storybook/addon-actions'


export default {
  title: 'AddItemForm Component',
  component: AddItemForm
}

const callback = action("Button 'add' wac pressed insidec the form")

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm AddItem={callback}/>
 } 

