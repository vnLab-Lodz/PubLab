import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addCollaborator,
  deleteCollaborator,
  setPublicationField,
} from '../../../../../shared/redux/slices/addPublicationWizardSlice';
import { PublicationBase } from '../../../../../shared/types';
import CollaboratorsPicker from '../../../../components/CollaboratorsPicker/CollaboratorsPicker';
import PackageManagerPicker from '../../../../components/PackageManagerPicker/PackageManagerPicker';
import ProjectDetailsInput from '../../../../components/ProjectDetailsInput/ProjectDetailsInput';
import TechnologiesPicker from '../../../../components/TechnologiesPicker/TechnologiesPicker';

interface Props {
  publication: PublicationBase;
}

function Details(
  props: Props & {
    onValidationStateChange: (didValidationPass: boolean) => void;
  }
) {
  const dispatch = useDispatch();

  return (
    <ProjectDetailsInput
      onValidationStateChange={props.onValidationStateChange}
      onSubmit={(state) => {
        dispatch(setPublicationField({ field: 'name', value: state.name }));
        dispatch(
          setPublicationField({
            field: 'description',
            value: state.description,
          })
        );
      }}
      state={props.publication}
    />
  );
}

function PackageManager(props: Props) {
  const dispatch = useDispatch();

  return (
    <PackageManagerPicker
      onSubmit={(state) => {
        dispatch(
          setPublicationField({
            field: 'packageManager',
            value: state.packageManager,
          })
        );
      }}
      state={props.publication}
    />
  );
}

function Technologies(props: Props) {
  const dispatch = useDispatch();

  return (
    <TechnologiesPicker
      onSubmit={(state) => {
        dispatch(
          setPublicationField({
            field: 'useSass',
            value: state.useSass,
          })
        );
        dispatch(
          setPublicationField({
            field: 'useTypescript',
            value: state.useTypescript,
          })
        );
      }}
      state={props.publication}
    />
  );
}

function Collaborators(props: Props) {
  const dispatch = useDispatch();

  return (
    <CollaboratorsPicker
      onAdd={(state) => {
        dispatch(addCollaborator(state));
      }}
      onDelete={(id) => {
        dispatch(deleteCollaborator(id));
      }}
      state={props.publication}
    />
  );
}

export default [Details, PackageManager, Technologies, Collaborators];
