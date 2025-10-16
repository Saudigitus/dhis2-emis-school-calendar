import { FormControlLabel, RadioGroup } from "@mui/material";
import React from "react";
import { Label, Radio } from "@dhis2/ui"
import { useField, type FieldRenderProps } from "react-final-form";
import { FormFieldsProps } from "../../../types/form/GenericFieldsTypes";

function RadioButton(props: FormFieldsProps) {
  const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name as unknown as string);
  return (
    <RadioGroup
      {...props}
      row
      onChange={(event: { target: { value: any } }) => {
        input.onChange(event?.target?.value);
      }}
    >
      <FormControlLabel value={"true"} control={<Radio />} label={<Label className="mt-2">Yes</Label>} />
      <FormControlLabel value={"false"} control={<Radio />} label={<Label className="mt-2">No</Label>} />
    </RadioGroup>
  );
}

export default RadioButton;
