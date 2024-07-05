import React, { ComponentType } from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Card,
  Grid,
  Heading,
  Popover,
  Stack,
  Text,
} from '@sanity/ui';
import { AddIcon } from '@sanity/icons';
import {
  ArrayFieldProps,
  ArrayOfObjectsInputProps,
  ArraySchemaType,
} from 'sanity';
import BlocksBrowser from './BlocksBrowser';

const InputContainer = styled.div`
  fieldset {
    div[data-ui='Stack']
      > div[data-ui='Grid']:has(button[data-ui='MenuButton']) {
      display: none;
    }
  }
`;

const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: stretch;
  gap: 16px;
  width: 100%;
  button {
    flex-grow: 1;
  }
`;

const ArrayFunctions = ({ renderBlocksSelector, onPaste }) => {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const handleClose = () => {
    setIsAddOpen(!isAddOpen);
  };
  return (
    <Grid>
      <Popover
        style={{ width: 'calc(100% - 48px)' }}
        content={renderBlocksSelector({ onClose: handleClose })}
        padding={4}
        placement="top"
        portal
        open={isAddOpen}
      >
        <ButtonsContainer>
          <Button
            mode="ghost"
            selected={false}
            text="Add Block..."
            icon={AddIcon}
            onClick={handleClose}
            disabled={window.location.pathname.startsWith('/presentation/')}
          />
          <Button
            mode="ghost"
            selected={false}
            text="Paste Block..."
            icon={AddIcon}
            onClick={onPaste}
          />
        </ButtonsContainer>
      </Popover>
    </Grid>
  );
};

type BlocksInputCustomProps = {
  presets: object[];
};

export const BlocksInput: ComponentType<ArrayFieldProps> = (
  props: ArrayFieldProps & BlocksInputCustomProps,
) => {
  const inputProps: ArrayFieldProps['inputProps'] = {
    ...props.inputProps,
    arrayFunctions: () => (
      <ArrayFunctions
        renderBlocksSelector={({ onClose }) => {
          return (
            <BlocksBrowser
              onClose={onClose}
              onItemAppend={props.inputProps.onItemAppend}
              presets={props.presets}
            />
          );
        }}
        onPaste={() => console.log('migrating')}
      />
    ),
  };

  return (
    <Stack space={[3, 3, 4, 5]}>
      <Card>
        <Text>{props.title}</Text>
        <Text>{props.description}</Text>
      </Card>
      {props.inputProps.renderInput(inputProps)}
    </Stack>
  );
};
