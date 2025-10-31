import { D2I18n } from "dhis2-semis-types";

const fieldsSchoolDetails = (i18n: D2I18n) => {
  return [
    {
      required: true,
      name: "code",
      labelName: i18n.t("Academic year"),
      header: i18n.t("Academic year"),
      Placeholder: i18n.t("Academic year"),
      valueType: "LIST",
      disabled: true,
      pattern: "",
      visible: true,
      description: i18n.t("Academic year"),
      id: "code",
      displayName: i18n.t("Academic year"),
    },
    {
      required: false,
      name: "description",
      labelName: i18n.t("Description"),
      header: i18n.t("Description"),
      Placeholder: i18n.t("Description you configuration"),
      valueType: "TEXT",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Description"),
      id: "description",
      displayName: i18n.t("Description"),
    },
    {
      required: true,
      name: "startDate",
      labelName: i18n.t("Start date"),
      header: i18n.t("Start date"),
      Placeholder: i18n.t("Start date"),
      valueType: "DATE",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Start date"),
      id: "startDate",
      displayName: i18n.t("Start date"),
    },
    {
      required: true,
      name: "endDate",
      labelName: i18n.t("End date"),
      header: i18n.t("End date"),
      Placeholder: i18n.t("End date"),
      valueType: "DATE",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("End date"),
      id: "endDate",
      displayName: i18n.t("End date"),
    },
  ];
};

export { fieldsSchoolDetails };
