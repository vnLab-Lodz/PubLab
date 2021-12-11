import reducer, {
  setPublicationsList,
  loadPublication,
  deletePublication,
  updatePublicationField,
  addCollaborator,
  deleteCollaborator,
  Publication,
  Collaborator,
  PublicationModification,
} from './loadPublicationsSlice';

describe('loadPublicationsSlice', () => {
  const publication: Publication = {
    id: 'id',
    dirPath: 'dir_path',
    publicationName: 'pub_name',
    description: 'description',
    collaborators: [],
    packageManager: 'package_man',
    useSass: true,
    useTypescript: true,
  };

  it('handles setPublicationsList action', () => {
    const publications: Publication[] = [publication];
    expect(reducer(undefined, setPublicationsList(publications))).toEqual([
      {
        id: 'id',
        dirPath: 'dir_path',
        publicationName: 'pub_name',
        description: 'description',
        collaborators: [],
        packageManager: 'package_man',
        useSass: true,
        useTypescript: true,
      },
    ]);
  });

  it('handles loadPublication action', () => {
    const publications: Publication[] = [];
    expect(reducer(publications, loadPublication(publication))).toEqual([
      {
        id: 'id',
        dirPath: 'dir_path',
        publicationName: 'pub_name',
        description: 'description',
        collaborators: [],
        packageManager: 'package_man',
        useSass: true,
        useTypescript: true,
      },
    ]);
  });

  it('handles deletePublication action', () => {
    expect(reducer([publication], deletePublication('id'))).toEqual([]);
  });

  it('handles updatePublicationField action', () => {
    const pubMob: PublicationModification = {
      id: 'id',
      field: 'useSass',
      value: false,
    };
    expect(reducer([publication], updatePublicationField(pubMob))).toEqual([
      {
        id: 'id',
        dirPath: 'dir_path',
        publicationName: 'pub_name',
        description: 'description',
        collaborators: [],
        packageManager: 'package_man',
        useSass: false,
        useTypescript: true,
      },
    ]);
  });

  it('handles addCollaborator action', () => {
    const collaborator: Collaborator = {
      id: 'col_id',
      githubUsername: 'github_user',
      role: 'role',
    };
    const colListMod = {
      id: 'id',
      value: collaborator,
    };
    expect(reducer([publication], addCollaborator(colListMod))).toEqual([
      {
        id: 'id',
        dirPath: 'dir_path',
        publicationName: 'pub_name',
        description: 'description',
        collaborators: [
          {
            id: 'col_id',
            githubUsername: 'github_user',
            role: 'role',
          },
        ],
        packageManager: 'package_man',
        useSass: true,
        useTypescript: true,
      },
    ]);
  });

  it('handles deleteCollaborator action', () => {
    const publicationWithCollaborator: Publication = {
      id: 'id',
      dirPath: 'dir_path',
      publicationName: 'pub_name',
      description: 'description',
      collaborators: [
        {
          id: 'col_id',
          githubUsername: 'github_user',
          role: 'role',
        },
      ],
      packageManager: 'package_man',
      useSass: true,
      useTypescript: true,
    };
    const colListMod = {
      id: 'id',
      value: 'col_id',
    };
    expect(
      reducer([publicationWithCollaborator], deleteCollaborator(colListMod))
    ).toEqual([
      {
        id: 'id',
        dirPath: 'dir_path',
        publicationName: 'pub_name',
        description: 'description',
        collaborators: [],
        packageManager: 'package_man',
        useSass: true,
        useTypescript: true,
      },
    ]);
  });
});
