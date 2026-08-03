import React from "react";
import {
    Card,
    CardContent,
    Skeleton,
    Divider,
} from "@mui/material";
import styles from "./mainCard.module.css";

function MainCardSkeleton() {
    return (
        <Card elevation={0} className={styles.card}>
            <CardContent className={styles.cardContent}>
                {/* Header */}
                <div className={styles.cardHead}>
                    <Skeleton variant="text" width={100} height={32} />
                    <Skeleton variant="circular" width={36} height={36} />
                </div>

                {/* Description */}
                <Skeleton
                    variant="text"
                    width={170}
                    height={20}
                    style={{ marginTop: 8 }}
                />

                <Divider style={{ margin: "10px 0" }} />

                {/* Label */}
                <Skeleton
                    variant="text"
                    width={130}
                    height={20}
                    style={{ marginBottom: 8 }}
                />

                {/* Dates */}
                <div
                    style={{
                        gap: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Skeleton variant="text" width={150} height={20} />
                    <Skeleton variant="text" width={150} height={20} />
                </div>

                {/* Buttons */}
                <div className={styles.cardActions}>
                    <Skeleton variant="text" width={170} height={42} />
                    <Skeleton variant="text" width={170} height={42} />
                </div>
            </CardContent>
        </Card>
    );
}

export default MainCardSkeleton;