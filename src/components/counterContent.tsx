import React, { useState, useEffect } from 'react';

interface CategoryCount {
    categoryName: string;
    count: number;
}

export default function CounterContents ({ contents }:any) {
    const [categoryCounts, setCategoryCounts] = useState<string>('');

    useEffect(() => {
        const countByCategory = (contents: any[]): string => {
            const categoryMap = new Map<string, number>();

            contents.forEach(content => {
                const categoryName = content.category.name;
                if (categoryMap.has(categoryName)) {
                    categoryMap.set(categoryName, categoryMap.get(categoryName)! + 1);
                } else {
                    categoryMap.set(categoryName, 1);
                }
            });

            const categoryCounts: CategoryCount[] = [];
            categoryMap.forEach((count, categoryName) => {
                categoryCounts.push({ categoryName, count });
            });

            const output = categoryCounts.map(({ categoryName, count }) => `${count} ${categoryName}`).join(' - ');

            return `<div>${output}</div>`;
        };

        setCategoryCounts(countByCategory(contents));
    }, [contents]);

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: categoryCounts }} />
        </div>
    );
};