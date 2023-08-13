"use client";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
export default function Formi({
  id,
  name,
  type,
  onChange,
  value,
  label,
  variant,
  ...rest
 
}) {
  return (
 
    <Field
      name={name}
      validate={(value) => rest.validate && rest.validate(value)}
    >
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]} {...rest}>
         
          <Input {...field} id={name} type={type} variant="filled" placeholder={label} {...rest} borderColor='gray.400'/>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}