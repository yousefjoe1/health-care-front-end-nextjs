import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectionsProps {
    name: string;
    placeholder: string;
    data: { id: string, [key: string]: string }[];
    itemNameKey: string;
    field: { onChange: (value: string) => void, value: string };
    selectWidth?: string;
}

const Selections = ({ name, placeholder, data, itemNameKey, field, selectWidth = '' }: SelectionsProps) => {
    return (
        <FormItem>
            <FormLabel>{name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger className={selectWidth} >
                        <SelectValue placeholder={`${placeholder || 'إختر'}`} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {data?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item[`${itemNameKey}`]}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
    )
}

export default Selections