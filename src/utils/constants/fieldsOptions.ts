import { D2I18n } from "dhis2-semis-types";

const fieldsOptions = (i18n: D2I18n) => {
  return [
    {
      required: true,
      name: "name",
      labelName: i18n.t("Name"),
      header: i18n.t("Name"),
      Placeholder: i18n.t("Name"),
      valueType: "TEXT",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Name"),
      id: "code",
      displayName: i18n.t("Name"),
    },
    {
      required: true,
      name: "code",
      labelName: i18n.t("Code"),
      header: i18n.t("Code"),
      Placeholder: i18n.t("Code you configuration"),
      valueType: "TEXT",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Code"),
      id: "code",
      displayName: i18n.t("Code")
    }
  ];
};

export { fieldsOptions };
