import styles from './AllQuizResults.module.css'

export const headers = [
    { key: "id", label: "ID" },
    { key: "full_name", label: "Full name" },
    { key: "email", label: "Email" },
    { key: "score", label: "Score" },
];

export function sortData({
    tableData,
    sortKey,
    reverse,
    data,
}) {
    if (!sortKey) return tableData;
    const sortedData = data?.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (sortedData && reverse) {
        return sortedData.reverse();
    }

    return sortedData;
}

export function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={`${sortKey === columnKey && sortOrder === "Descending"
                ? `${styles['sort-button']} ${styles['sort-reverse']}`
                : styles['sort-button']
                }`}
        >
            ▲
        </button>
    );
}