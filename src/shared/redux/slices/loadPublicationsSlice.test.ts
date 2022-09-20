import { Collaborator, Publication, USER_ROLES } from '../../types';
import reducer, {
  setPublicationsList,
  loadPublication,
  deletePublication,
  updatePublicationField,
  addCollaborator,
  deleteCollaborator,
  PublicationModification,
  CollaboratorListModification,
  setActivePublication,
} from './loadPublicationsSlice';

const collaborator: Collaborator = {
  id: 'col_id',
  githubUsername: 'github_user',
  role: USER_ROLES.DEVELOPER,
};

const publication: Publication = {
  id: 'id',
  creationDate: Date.now(),
  lastUpdate: Date.now(),
  status: 'cloned',
  dirPath: 'path',
  tags: ['tag'],
  name: 'pub_name',
  description: 'description',
  collaborators: [],
  packageManager: 'npm',
  useSass: true,
  useTypescript: true,
  snippets: [],
  keepDescriptionVisible: false,
  keepSnippetsVisible: false,
  keepServerVisible: false,
};

describe('loadPublicationsSlice', () => {
  it('handles setPublicationsList action', () => {
    const publications: Publication[] = [publication];
    expect(
      reducer(
        { activePublicationId: null, publications: [] },
        setPublicationsList(publications)
      )
    ).toEqual({
      activePublicationId: null,
      publications: [publication],
    });
  });

  it('handles setActivePublication action', () => {
    expect(
      reducer(
        { activePublicationId: null, publications: [publication] },
        setActivePublication(publication.id)
      )
    ).toEqual({
      activePublicationId: publication.id,
      publications: [publication],
    });
  });

  it('handles loadPublication action', () => {
    expect(
      reducer(
        { activePublicationId: null, publications: [] },
        loadPublication(publication)
      )
    ).toEqual({
      activePublicationId: null,
      publications: [publication],
    });
  });

  it('handles deletePublication action', () => {
    expect(
      reducer(
        { activePublicationId: null, publications: [publication] },
        deletePublication('id')
      )
    ).toEqual({
      activePublicationId: null,
      publications: [],
    });
  });

  it('handles updatePublicationField action', () => {
    const pubMod: PublicationModification = {
      id: 'id',
      field: 'useSass',
      value: false,
    };
    expect(
      reducer(
        { activePublicationId: null, publications: [publication] },
        updatePublicationField(pubMod)
      )
    ).toEqual({
      activePublicationId: null,
      publications: [{ ...publication, useSass: false }],
    });
  });

  it('handles addCollaborator action', () => {
    const colListMod: CollaboratorListModification<Collaborator> = {
      id: 'id',
      value: collaborator,
    };

    expect(
      reducer(
        {
          activePublicationId: null,
          publications: [publication],
        },
        addCollaborator(colListMod)
      )
    ).toEqual({
      activePublicationId: null,
      publications: [{ ...publication, collaborators: [collaborator] }],
    });
  });

  it('handles deleteCollaborator action', () => {
    const publicationWithCollaborator: Publication = {
      ...publication,
      collaborators: [collaborator],
    };
    const colListMod = {
      id: 'id',
      value: 'col_id',
    };
    expect(
      reducer(
        {
          activePublicationId: null,
          publications: [publicationWithCollaborator],
        },
        deleteCollaborator(colListMod)
      )
    ).toEqual({ activePublicationId: null, publications: [publication] });
  });
});
