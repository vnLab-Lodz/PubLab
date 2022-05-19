import React from 'react';
import { widths } from '../../../../components/FileDisplay/Columns';
import * as Styled from '../../../../components/FileDisplay/style';

export default function ToParentFolder() {
  return (
    <Styled.DataContainer>
      <Styled.DataField
        sx={{
          width: widths[0],
          justifyContent: 'start',
        }}
      >
        ••
      </Styled.DataField>
      <Styled.DataField sx={{ width: widths[1] }} />
      <Styled.DataField sx={{ width: widths[2] }} />
    </Styled.DataContainer>
  );
}
