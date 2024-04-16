import {AddItemForm} from "../addItemForm";
import { action } from '@storybook/addon-actions';

export default {
    title: "first example",
    component: AddItemForm,
}

const myCallback  = action("Button was pressed")

export const addItem = (props: any) => {return <AddItemForm addItem={myCallback}/>}

