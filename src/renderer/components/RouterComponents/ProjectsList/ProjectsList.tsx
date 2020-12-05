import React, { useState } from 'react';
import Select from 'react-select';
import { IProject } from './IProject';
import { State } from './IProjectState';
import add_icon from './add_circle-24px.svg';
import article_icon from './article-24px.svg';
import lupka from './search-24px.svg';

import './ProjectsList.scss';

const project: IProject[] = [
  {
    id: 0,
    image: article_icon,
    name: 'Jaś i Małgosia',
    date_creation: new Date(2018, 10, 31),
    date_edition: new Date(2018, 10, 31),
    tags: ['TAG A', 'TAG B'],
    state: State.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 1,
    image: article_icon,
    name: 'Epoka Lodowcowa',
    date_creation: new Date(2018, 12, 31),
    date_edition: new Date(2018, 10, 31),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: State.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 2,
    image: article_icon,
    name: 'Kraina Lodu',
    date_creation: new Date(1998, 2, 31),
    date_edition: new Date(2018, 10, 31),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: State.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 3,
    image: article_icon,
    name: 'Kraina Lodu',
    date_creation: new Date(1999, 3, 31),
    date_edition: new Date(2018, 10, 31),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: State.Cloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
  {
    id: 4,
    image: article_icon,
    name: 'Epoka Lodowcowa',
    date_creation: new Date(2018, 12, 31),
    date_edition: new Date(2018, 10, 31),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: State.NotCloned,
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  },
];

interface IProps {
  project: IProject[];
}

const ProjectsList = () => {
  const newProjectPlaceHolder = {
    id: 7,
    image: article_icon,
    name: 'New project',
    date_creation: new Date(2018, 12, 31),
    date_edition: new Date(2018, 12, 31),
    tags: ['TAG C', 'TAG A', 'TAG D'],
    state: State.NotCloned,
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
      value: (a: IProject, b: IProject) =>
        a.date_edition === b.date_edition
          ? 0
          : a.date_edition > b.date_edition
          ? 1
          : -1,
      label: <div>Last modified &uarr;</div>,
    },
    {
      value: (a: IProject, b: IProject) =>
        a.date_edition === b.date_edition
          ? 0
          : a.date_edition > b.date_edition
          ? -1
          : 1,
      label: <div>Last modified &darr;</div>,
    },
    {
      value: (a: IProject, b: IProject) =>
        a.date_creation === b.date_creation
          ? 0
          : a.date_creation > b.date_creation
          ? 1
          : -1,
      label: <div>Created &uarr;</div>,
    },
    {
      value: (a: IProject, b: IProject) =>
        a.date_creation === b.date_creation
          ? 0
          : a.date_creation > b.date_creation
          ? -1
          : 1,
      label: <div>Created &darr;</div>,
    },
  ];

  const options_filter = [
    {
      value: (s: IProject) => {
        return true;
      },
      label: 'Both',
    },
    {
      value: (s: IProject) => {
        return s.state == State.Cloned;
      },
      label: 'Cloned',
    },
    {
      value: (s: IProject) => {
        return s.state == State.NotCloned;
      },
      label: 'Not cloned',
    },
  ];

  const [displayedProjects, setDisplayedProjects] = useState(
    project ? project : []
  );

  const [searchPhrase, setSearchPhrase] = useState('');
  const [
    sortOption,
    setSortOption,
  ] = useState(() => (a: IProject, b: IProject) =>
    a.id === b.id ? 0 : a.id > b.id ? 1 : -1
  );
  const [filterOption, setFilterOption] = useState(() => (s: IProject) => true);
  const [pickedProject, setPickedProject] = useState({
    id: -1,
    image: {},
    name: '',
    date_creation: new Date(),
    date_edition: new Date(),
    tags: [],
    state: {},
    last_modified_by: '',
    technologies: [],
    coauthors: [],
    description: '',
  });

  const formatDate = (date_ob: Date) => {
    const date = ('0' + date_ob.getDate()).slice(-2);
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    return `${year}-${month}-${date}`;
  };

  const applyAllSortsFilters = () => {
    const clone: IProject[] = [];
    displayedProjects.forEach((val) => clone.push(Object.assign({}, val)));
    clone.sort(sortOption);
    return clone
      .filter(filterOption)
      .filter((s) => s.name.includes(searchPhrase));
  };

  const addNewProject = (project: IProject) => {
    const clone: IProject[] = [];
    displayedProjects.forEach((val) => clone.push(Object.assign({}, val)));
    clone.push(project);
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
                <img src={lupka} className='projectList__search_icon' />
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
                <img className='projectList__icon' src={project.image} />
                <button
                  className='projectList__button'
                  onClick={() => {
                    setPickedProject(project);
                  }}
                >
                  <div className='projectList_title'>{project.name}</div>
                  <div className='projectList__project-details'>
                    <div>Created: {formatDate(project.date_creation)}</div>
                    <div>Last modified:{formatDate(project.date_edition)}</div>
                    {project.tags.map((tag) => (
                      <div className='projectList__tags'>{tag}</div>
                    ))}
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <button
            className='projectList__add_button'
            onClick={() => addNewProject(newProjectPlaceHolder)}
          >
            <img
              src={add_icon}
              style={{ width: '60px', height: '60px', borderRadius: '50%' }}
            />
          </button>
        </div>
      </div>
      <div className='projectList__project__info'>
        {pickedProject.id == -1 ? (
          <div style={{ color: 'white' }}>
            {displayedProjects.length == 0 ? (
              <h2
                style={{
                  marginLeft: '35px',
                  marginRight: '35px',
                  marginTop: '450px',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                }}
              >
                Click <img src={add_icon} style={{ borderRadius: '50%' }} /> to
                create new project
              </h2>
            ) : (
              <div>
                <h1 className='projectList__info_header'>VNLAB</h1>
                <div style={{ marginLeft: '35px', marginRight: '35px' }}>
                  <h2>Info, shortcuts, tips</h2>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ color: 'white' }}>
            <h1 className='projectList__info_header'> Project's info</h1>
            <h2 style={{ marginLeft: '35px', marginRight: '35px' }}>
              Title: {pickedProject?.name}
            </h2>
            <div style={{ marginLeft: '35px', marginRight: '35px' }}>
              <h3>
                Date of creation: {formatDate(pickedProject?.date_creation)}
              </h3>
              <h3>Last modified: {formatDate(pickedProject?.date_edition)}</h3>
              <h3>Last modified by: {pickedProject?.last_modified_by}</h3>
              <h3 style={{ display: 'flex', flexDirection: 'row' }}>
                {' '}
                Coauthors:
                {pickedProject?.coauthors.map((tag) => (
                  <div className='projectList__tags'>{tag}</div>
                ))}
              </h3>
              <h3 style={{ display: 'flex', flexDirection: 'row' }}>
                {' '}
                Technologies:
                {pickedProject?.technologies.map((tag) => (
                  <div className='projectList__tags'>{tag}</div>
                ))}
              </h3>
              <h3 style={{ display: 'flex', flexDirection: 'row' }}>
                {' '}
                Tags:
                {pickedProject?.tags.map((tag) => (
                  <div className='projectList__tags'>{tag}</div>
                ))}
              </h3>
              <h3>Description: {pickedProject?.description}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
