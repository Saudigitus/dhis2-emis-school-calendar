import { useState } from "react";
import { D2I18n } from "dhis2-semis-types";
import { useUrlParams } from "dhis2-semis-functions";
import styles from "./rightActionsButtons.module.css";
import AddNewOption from "../modal/newOption/AddNewOption";
import { ModalComponent, CustomDropdown } from "dhis2-semis-components";
import { Button, ButtonStrip, IconAddCircle24, IconFilter24 } from "@dhis2/ui";

function RightActionsButtons({ i18n }: { i18n: D2I18n }) {
    const i18nLocal = i18n
    const { add, remove } = useUrlParams()
    const [openDialogOption, setOpenDialogOption] = useState(false)

    return (
        <div className={styles.container}>
            <CustomDropdown
                disabled={false}
                icon={<IconFilter24 />}
                options={[
                    { label: "All", onClick: () => { remove("filter") }, },
                    { label: "Active", onClick: () => { add("filter", "active") }, },
                    { label: "Inactive", onClick: () => { add("filter", "inactive") }, },
                ]}
                name={<span className={styles.work_buttons_text}>{i18n.t('Filter Options')}</span> as unknown as string}
            />
            <ButtonStrip className={styles.work_buttons}>
                <Button
                    disabled={false}
                    onClick={() => {
                        setOpenDialogOption(true)
                    }}
                    icon={<IconAddCircle24 />}
                    className={styles.topButton}
                >
                    {i18nLocal.t("New Academc Year Option")}
                </Button>
            </ButtonStrip>

            <ModalComponent
                open={openDialogOption}
                title={i18nLocal.t("Add new option")}
                handleClose={() => setOpenDialogOption(false)}
                children={
                    <AddNewOption
                        i18next={i18n}
                        setOpen={setOpenDialogOption}
                    />
                }
            />
        </div>
    )
}

export default RightActionsButtons