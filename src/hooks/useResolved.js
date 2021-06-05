import { useState, useEffect } from 'react';
export const useResolved = (...vals) => {
    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        setResolved(vals.every(value => value !== undefined));
    }, [vals]);

    return resolved;
};
