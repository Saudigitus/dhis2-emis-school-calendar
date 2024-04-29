import React from "react";
import { SplitButton } from "@dhis2/ui";
import FlyoutMenuComponent from "../menu/FlyoutMenu";
import { DropdownButtonComponentProps } from "../../types/buttons/DropdownButtonProps";

function DropdownButtonComponent(props: DropdownButtonComponentProps): React.ReactElement {
  const { name, icon, options, disabled } = props;

  return (
    <SplitButton
      icon={icon}
      disabled={disabled}
      component={<FlyoutMenuComponent options={options} />}
    >
      {name}
    </SplitButton>
  );
}

export default DropdownButtonComponent;
