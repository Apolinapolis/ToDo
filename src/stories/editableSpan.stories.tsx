import { action } from '@storybook/addon-actions';
import {EditableSpan} from "../editableSpan";

export default {
    title: "Editable Span test component",
    component: EditableSpan,
}

const Callback  = action("value is changed")

export const editableSpanBaseExample = () => {
    return <EditableSpan title={"Start value"} onChange={Callback}/>}

