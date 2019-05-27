import { render, fireEvent } from 'react-testing-library';
import React from 'react';

import ConnectorProvider from 'state/ConnectorProvider';
import mockConnector from 'tests/mockConnector';

import EntryDeleteContainer from '../index';

const defaultConnectorProps = {
  didRequestDelete: false,
  isConfirmButtonDisabled: false,
  handleRequestDelete: jest.fn(),
  handleCancelRequestDelete: jest.fn(),
  handleClickDelete: jest.fn(),
};

function renderSubject(connectors = {}) {
  const defaultConnectors = {
    EntryDeleteContainerConnector: mockConnector(defaultConnectorProps),
  };

  const component = (
    <ConnectorProvider connectors={{ ...defaultConnectors, ...connectors }}>
      <EntryDeleteContainer />
    </ConnectorProvider>
  );

  return render(component);
}

describe('EntryDeleteContainer', () => {
  it('renders initial state with click handler', () => {
    const { getByText } = renderSubject();
    expect(getByText('delete')).toBeTruthy();
    fireEvent.click(getByText('delete'));
    expect(defaultConnectorProps.handleRequestDelete).toBeCalled();
  });

  it('renders didRequestDelete state with click handlers', () => {
    const connectors = {
      EntryDeleteContainerConnector: mockConnector({
        ...defaultConnectorProps,
        ...{
          didRequestDelete: true,
        },
      }),
    };

    const { getByText } = renderSubject(connectors);
    expect(getByText('Are you sure?')).toBeTruthy();
    fireEvent.click(getByText('yup'));
    expect(defaultConnectorProps.handleClickDelete).toBeCalled();
    fireEvent.click(getByText('nope'));
    expect(defaultConnectorProps.handleCancelRequestDelete).toBeCalled();
  });
});
