"use client";

import { useMemo, useState } from "react";

export const useClientPagination = (items = [], defaultLimit = 10) => {
  const [limit, setLimit] = useState(defaultLimit);
  const [offset, setOffset] = useState(0);

  const paginatedItems = useMemo(
    () => items.slice(offset, offset + limit),
    [items, limit, offset]
  );

  return {
    limit,
    setLimit,
    offset,
    setOffset,
    total: items.length,
    paginatedItems,
  };
};
