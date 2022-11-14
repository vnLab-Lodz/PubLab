import { useEffect, useState } from 'react';
import { Publication } from 'src/shared/types';
import { SORTABLE_FIELD, SortParams } from '../../../types';

const collator = new Intl.Collator([], { numeric: true });
const compareFunctions = {
  [SORTABLE_FIELD.TITLE]: (a: Publication, b: Publication) =>
    collator.compare(a.name, b.name),
  [SORTABLE_FIELD.CREATED_ON]: (a: Publication, b: Publication) =>
    a.creationDate - b.creationDate,
  [SORTABLE_FIELD.CHANGE_DATE]: (a: Publication, b: Publication) =>
    a.lastUpdate - b.lastUpdate,
};

export default function useProcessedProjectsList(publications: Publication[]) {
  const [projectsList, setProjectList] = useState(publications);
  const [sortParams, setSortParams] = useState({
    field: SORTABLE_FIELD.TITLE,
    direction: 'ascending',
  } as SortParams);
  const [statusFilterValue, setStatusFilterValue] = useState(
    null as Publication['status'] | null
  );

  useEffect(() => {
    const list = statusFilterValue
      ? publications.filter((project) => project.status === statusFilterValue)
      : [...publications];
    list.sort(compareFunctions[sortParams.field]);
    if (sortParams.direction === 'descending') list.reverse();
    setProjectList(list);
  }, [publications, sortParams, statusFilterValue]);

  return {
    projectsList,
    sortParams,
    statusFilterValue,
    setSortParams,
    setStatusFilterValue,
  };
}
