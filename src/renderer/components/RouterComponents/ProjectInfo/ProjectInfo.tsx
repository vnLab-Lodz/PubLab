import React from 'react';
import { IProject } from '../ProjectsList/IProject';
import { formatDate } from '../../../utils/formatDate';
import './ProjectInfo.scss';

interface IProps {
  project: IProject;
}

const ProjectInfo = ({ project }: IProps) => (
  <div className='projectList__project__info'>
    {project.id == -1 ? null : (
      <div style={{ color: 'white' }}>
        <h1 className='projectList__info_header'> Project's info</h1>
        <h2 style={{ marginLeft: '35px', marginRight: '35px' }}>
          Title: {project?.name}
        </h2>
        <div style={{ marginLeft: '35px', marginRight: '35px' }}>
          <h3>Date of creation: {formatDate(project?.date_creation)}</h3>
          <h3>Last modified: {formatDate(project?.date_edition)}</h3>
          <h3>Last modified by: {project?.last_modified_by}</h3>
          <h3 style={{ display: 'flex', flexDirection: 'row' }}>
            {' '}
            Coauthors:
            {project?.coauthors.map((tag) => (
              <div className='projectList__tags' key={tag}>
                {tag}
              </div>
            ))}
          </h3>
          <h3 style={{ display: 'flex', flexDirection: 'row' }}>
            {' '}
            Technologies:
            {project?.technologies.map((tag) => (
              <div className='projectList__tags' key={tag}>
                {tag}
              </div>
            ))}
          </h3>
          <h3 style={{ display: 'flex', flexDirection: 'row' }}>
            {' '}
            Tags:
            {project?.tags.map((tag) => (
              <div className='projectList__tags' key={tag}>
                {tag}
              </div>
            ))}
          </h3>
          <h3>Description: {project?.description}</h3>
        </div>
      </div>
    )}
  </div>
);

export default ProjectInfo;
