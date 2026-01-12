import { D2I18n } from "dhis2-semis-types";

const fieldsTerm = (i18n: D2I18n) => {
  return [
    {
      required: true,
      name: "description",
      labelName: i18n.t("Description"),
      Placeholder: i18n.t("Description"),
      valueType: "TEXT",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Description"),
      id: "description",
      displayName: i18n.t("Description"),
      type: "attribute",
    },
    {
      required: true,
      name: "startDate",
      labelName: i18n.t("Start Date"),
      Placeholder: i18n.t("Start Date"),
      valueType: "DATE",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Start Date"),
      id: "startDate",
      displayName: i18n.t("Start Date"),
      type: "attribute",
    },
    {
      required: true,
      name: "endDate",
      labelName: i18n.t("End Date"),
      Placeholder: i18n.t("End Date"),
      valueType: "DATE",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("End Date"),
      id: "endDate",
      displayName: i18n.t("End Date"),
      type: "attribute",
    },
  ];
};

export { fieldsTerm };
