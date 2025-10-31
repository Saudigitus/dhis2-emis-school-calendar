import { D2I18n } from "dhis2-semis-types";

const nonSchooldayFields = (i18n: D2I18n) => {
  return [
    {
      required: true,
      name: "date",
      labelName: i18n.t("Date"),
      Placeholder: i18n.t("Date"),
      valueType: "DATE",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Date"),
      id: "date",
      displayName: i18n.t("Date"),
      type: "attribute",
    },
    {
      required: true,
      name: "type",
      labelName: i18n.t("Type"),
      Placeholder: i18n.t("Non-Schoolday Type"),
      valueType: "LIST",
      options: {
        optionSet: {
          options: [
            {
              value: "public_holiday",
              label: i18n.t("Public Holiday"),
            },
            {
              value: "special_events",
              label: i18n.t("Special Events"),
            },
          ],
        },
      },
      disabled: false,
      visible: true,
      description: i18n.t("Type"),
      error: false,
      content: "",
      id: "Type",
      displayName: i18n.t("Type"),
      header: i18n.t("Type"),
      type: "attribute",
    },
    {
      required: true,
      name: "event",
      labelName: i18n.t("Event"),
      valueType: "TEXT",
      disabled: false,
      pattern: "",
      visible: true,
      description: i18n.t("Event"),
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "Event",
      displayName: i18n.t("Event"),
      header: i18n.t("Event"),
      type: "attribute",
    },
  ];
};

export { nonSchooldayFields };
