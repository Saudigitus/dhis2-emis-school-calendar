import React, { useState } from "react";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";
import { useHeader } from "../../../../hooks/tableHeader/useHeader";
import { TableColumnState } from "../../../../schema/columnSchema";
import { useRecoilState } from "recoil";
import { IconButton, List, Tooltip } from "@material-ui/core";
import { Apps, FormatListBulleted } from "@material-ui/icons";
import {  offDaysViewState } from "../../../../schema/offDaysViewSchema";
import i18n from "../../../../locales";

function HeaderFilters() {
  const { columns } = useHeader();
  const [updatedCols, setTableColumns] = useRecoilState(TableColumnState);
  const [templatesView, setTemplatesView] = useRecoilState(offDaysViewState);

  const setTableHeaders = (tableHeaders: any) => {
    setTableColumns(tableHeaders);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <EnrollmentFilters />

      <div>
        <Tooltip
          disableFocusListener
          disableTouchListener
          enterDelay={500}
          title={i18n.t("List view")}
          className="my-auto"
        >
          <IconButton
            size="small"
            title={i18n.t("List view")}
            color={templatesView === "list" ? "primary" : "default"}
            onClick={() => setTemplatesView("list")}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>

        <Tooltip
          disableFocusListener
          disableTouchListener
          enterDelay={500}
          title={i18n.t("Grid view")}
          className="my-auto"
        >
          <IconButton
            size="small"
            title={i18n.t("Grid view")}
            color={templatesView === "grid" ? "primary" : "default"}
            onClick={() => setTemplatesView("grid")}
          >
            <Apps />
          </IconButton>
        </Tooltip>
        <ConfigTableColumns
          filteredHeaders={updatedCols}
          headers={columns}
          updateVariables={setTableHeaders}
        />
      </div>
    </div>
  );
}

export default HeaderFilters;
