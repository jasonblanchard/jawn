import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Link from '../index';

describe('Link', () => {
  it('fires onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Link href="/workspace" onClick={onClick}>Jawn</Link>);

    fireEvent.click(getByText('Jawn'));
    expect(onClick).toBeCalledWith('/workspace');
  });

  it('does not fire onClick if the meta key is pressed', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Link href="/workspace" onClick={onClick}>Jawn</Link>);

    fireEvent.click(getByText('Jawn'), {
      metaKey: true,
    });
    expect(onClick).not.toBeCalled();
  });
});
