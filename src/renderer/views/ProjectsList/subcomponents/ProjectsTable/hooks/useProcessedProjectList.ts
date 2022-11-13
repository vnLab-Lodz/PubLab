import { useEffect, useState } from 'react';
import { Publication } from 'src/shared/types';
import { FIELD, FilterParams, SortParams } from '../../../types';

const filterFunctions = {
  [FIELD.STATUS]: (project: Publication, filterValue: FilterParams['value']) =>
    project.status === filterValue,
};

const collator = new Intl.Collator([], { numeric: true });
const compareFunctions = {
  [FIELD.TITLE]: (a: Publication, b: Publication) =>
    collator.compare(a.name, b.name),
  [FIELD.CREATED_ON]: (a: Publication, b: Publication) =>
    a.creationDate - b.creationDate,
  [FIELD.CHANGE_DATE]: (a: Publication, b: Publication) =>
    a.lastUpdate - b.lastUpdate,
};

export default function useProcessedProjectsList(publications: Publication[]) {
  const [projectsList, setProjectList] = useState(publications);
  const [sortParams, setSortParams] = useState({
    field: FIELD.TITLE,
    direction: 'ascending',
  } as SortParams);
  const [filterParams, setFilterParams] = useState(null as FilterParams | null);

  useEffect(() => {
    const list = filterParams
      ? publications.filter((project) =>
          filterFunctions[filterParams.field](project, filterParams.value)
        )
      : [...publications];
    list.sort(compareFunctions[sortParams.field]);
    if (sortParams.direction === 'descending') list.reverse();
    setProjectList(list);
  }, [publications, sortParams, filterParams]);

  return { projectsList, setSortParams, setFilterParams };
}
