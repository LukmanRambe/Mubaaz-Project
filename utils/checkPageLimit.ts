type CheckPageListParams = {
  totalItems: number;
  endItem: number;
};

export const checkPageLimit = ({
  totalItems,
  endItem,
}: CheckPageListParams) => {
  if (totalItems === 0) {
    return '0 ';
  }

  return totalItems && endItem > totalItems ? `${totalItems} ` : `${endItem} `;
};
