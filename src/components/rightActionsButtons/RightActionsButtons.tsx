import { Tooltip } from "react-bootstrap";
import { D2I18n } from "dhis2-semis-types";
import styles from "./rightActionsButtons.module.css"
import { Button, ButtonStrip, IconAddCircle24, } from "@dhis2/ui";

function RightActionsButtons({ i18n }: { i18n: D2I18n }) {

    return (
        <div className={styles.container}>
            <ButtonStrip className={styles.work_buttons}>
                <Tooltip
                    onClick={() => { }}
                >
                    <span>
                        <Button icon={<IconAddCircle24 />}>
                            <span className={styles.work_buttons_text}>
                               Teste
                            </span>
                        </Button>
                    </span>
                </Tooltip>
            </ButtonStrip>

        </div>
    )
}

export default RightActionsButtons