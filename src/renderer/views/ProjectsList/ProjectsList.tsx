/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { IProject } from './IProject';
import { STATE } from './IProjectState';
import add_icon from './add_circle-24px.svg';
import article_icon from './article-24px.svg';
import searchIcon from './search-24px.svg';
import deleteIcon from './delete-24px.svg';

import './ProjectsList.scss';
import { formatDate } from '../../../shared/utils/formatDate';
import { updateSubview } from '../../../shared/redux/slices/currentViewSlice';
import { SUBVIEWS } from '../../constants/Views';

const projects: IProject[] = [
  {
    id: 0,
    image: article_icon,
    name: 'Jaś i Małgosia',
    date_creation: new Date(2018, 10, 31).toString(),
    date_edition: new Date(2018, 10, 31).toString(),
    tags: ['TAG A', 'TAG B'],
    state: STATE.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 1,
    image: article_icon,
    name: 'Epoka Lodowcowa',
    date_creation: new Date(2018, 12, 31).toString(),
    date_edition: new Date(2018, 10, 30).toString(),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: STATE.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 2,
    image: article_icon,
    name: 'Kraina Lodu',
    date_creation: new Date(1998, 2, 31).toString(),
    date_edition: new Date(2018, 10, 29).toString(),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: STATE.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 3,
    image: article_icon,
    name: 'Kraina Lodu',
    date_creation: new Date(1999, 3, 31).toString(),
    date_edition: new Date(2018, 10, 28).toString(),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: STATE.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 4,
    image: article_icon,
    name: 'Epoka Lodowcowa',
    date_creation: new Date(2018, 12, 31).toString(),
    date_edition: new Date(2018, 10, 27).toString(),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: STATE.NotCloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
];

const ProjectsList = () => {
  const dispatch = useDispatch();

  const newProjectPlaceHolder = {
    id: 7,
    image: article_icon,
    name: 'New project',
    date_creation: new Date(2000, 12, 31).toString(),
    date_edition: new Date(2017, 12, 31).toString(),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: STATE.NotCloned,
    last_modified_by: '',
    technologies: [''],
    coauthors: [''],
    description: '',
  };

  const emptyProject: IProject = {
    id: -1,
    image: null,
    name: '',
    date_creation: new Date().toString(),
    date_edition: new Date().toString(),
    tags: [''],
    state: null,
    last_modified_by: '',
    technologies: [''],
    coauthors: [''],
    description: '',
  };

  const options_sort = [
    {
      value: (a: IProject, b: IProject) =>
        a.id === b.id ? 0 : a.id > b.id ? 1 : -1,
      label: <div>Nothing</div>,
    },
    {
      value: (a: IProject, b: IProject) => a.name.localeCompare(b.name),
      label: <div>Title &uarr;</div>,
    },
    {
      value: (a: IProject, b: IProject) => -a.name.localeCompare(b.name),
      label: <div>Title &darr;</div>,
    },
    {
      value: (a: IProject, b: IProject) => {
        const a_date = new Date(a.date_edition);
        const b_date = new Date(b.date_edition);
        return a_date === b_date ? 0 : a_date > b_date ? 1 : -1;
      },
      label: <div>Last modified &uarr;</div>,
    },
    {
      value: (a: IProject, b: IProject) => {
        const a_date = new Date(a.date_edition);
        const b_date = new Date(b.date_edition);
        return a_date === b_date ? 0 : a_date > b_date ? -1 : 1;
      },
      label: <div>Last modified &darr;</div>,
    },
    {
      value: (a: IProject, b: IProject) => {
        const a_date = new Date(a.date_creation);
        const b_date = new Date(b.date_creation);
        return a_date === b_date ? 0 : a_date > b_date ? 1 : -1;
      },
      label: <div>Created &uarr;</div>,
    },
    {
      value: (a: IProject, b: IProject) => {
        const a_date = new Date(a.date_creation);
        const b_date = new Date(b.date_creation);

        return a_date === b_date ? 0 : a_date > b_date ? -1 : 1;
      },
      label: <div>Created &darr;</div>,
    },
  ];

  const options_filter = [
    {
      value: () => true,
      label: 'Both',
    },
    {
      value: (s: IProject) => s.state === STATE.Cloned,
      label: 'Cloned',
    },
    {
      value: (s: IProject) => s.state === STATE.NotCloned,
      label: 'Not cloned',
    },
  ];

  const [displayedProjects, setDisplayedProjects] = useState(projects || []);

  const [searchPhrase, setSearchPhrase] = useState('');
  const [sortOption, setSortOption] = useState(
    () => (a: IProject, b: IProject) => a.id === b.id ? 0 : a.id > b.id ? 1 : -1
  );
  const [filterOption, setFilterOption] = useState(() => () => true);
  const [pickedProject, setPickedProject] = useState(emptyProject);

  useEffect(() => {
    if (displayedProjects.length === 0) {
      dispatch(
        updateSubview({
          element: SUBVIEWS.NO_PROJECTS,
        })
      );
    }
  }, [displayedProjects]);

  useEffect(() => {
    dispatch(
      updateSubview({
        element: SUBVIEWS.PROJECT_INFO,
        props: { project: pickedProject },
      })
    );
  }, [pickedProject]);

  const applyAllSortsFilters = () => {
    const clone: IProject[] = [];
    displayedProjects.forEach((val) => clone.push({ ...val }));
    clone.sort(sortOption);
    return clone
      .filter(filterOption)
      .filter((s) =>
        s.name.toLowerCase().includes(searchPhrase.toLocaleLowerCase())
      );
  };

  const addNewProject = (project: IProject) => {
    const clone: IProject[] = [];
    displayedProjects.forEach((val) => clone.push({ ...val }));
    clone.push(project);
    setDisplayedProjects(clone);
  };

  const removeProjectFromProjectList = (rProject: IProject) => {
    const clone: IProject[] = [];
    displayedProjects.forEach((val) => clone.push({ ...val }));
    const index = clone.indexOf(rProject, 0);
    clone.splice(index);
    setDisplayedProjects(clone);
  };

  return (
    <div className='projectList__container'>
      <div className='projectList__list__container'>
        <div className='projectList__content'>
          <Select
            className='projectList__select_filiter'
            options={options_filter}
            onChange={(option: { value: any; label: string }) => {
              setFilterOption(() => option.value);
            }}
          />
          <div className='projectList__search_sort'>
            <form>
              <div style={{ position: 'relative' }}>
                <img
                  src={searchIcon}
                  className='projectList__search_icon'
                  alt='Search'
                />
                <input
                  className='projectList__input'
                  type='text'
                  onChange={(e) => setSearchPhrase(e.target.value)}
                />
              </div>
            </form>
            <Select
              className='projectList__select'
              options={options_sort}
              placeholder='Sort by...'
              onChange={(option: { value: any; label: any }) =>
                setSortOption(() => option.value)
              }
            />
          </div>
          <ul className='projectList__list'>
            {applyAllSortsFilters().map((project) => (
              <li key={project.id} className='projectList__list_element'>
                <img
                  className='projectList__icon'
                  src={project.image}
                  alt='Project thumb'
                />
                <button
                  type='button'
                  className='projectList__button'
                  onClick={() => {
                    setPickedProject(project);
                  }}
                >
                  <div className='projectList_title'>{project.name}</div>
                  <div className='projectList__project-details'>
                    <div>Created: {formatDate(project.date_creation)}</div>
                    <div style={{ marginLeft: '5%' }}>
                      Last modified:{formatDate(project.date_edition)}
                    </div>
                    {project.tags.map((tag) => (
                      <div className='projectList__tags' key={tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </button>
                <button
                  type='button'
                  className='projectList_remove_button'
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    confirm('Are you sure you want to delete this project?');
                    if (project.id === pickedProject.id) {
                      setPickedProject(emptyProject);
                    }
                    removeProjectFromProjectList(project);
                  }}
                >
                  <img
                    className='projectList__remove_icon'
                    src={deleteIcon}
                    alt='Delete bin'
                  />
                </button>
              </li>
            ))}
          </ul>
          <button
            type='button'
            className='projectList__add_button'
            onClick={() => addNewProject(newProjectPlaceHolder)}
          >
            <img
              src={add_icon}
              style={{ width: '60px', height: '60px', borderRadius: '50%' }}
              alt='Add project'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
