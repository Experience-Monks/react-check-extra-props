import React from 'react';
import PropTypes from 'prop-types';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import withCheckExtraProps from '.';

const warnSpy = jest.spyOn(global.console, 'warn');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('withCheckExtraProps', () => {
  test('should work with functional components', () => {
    function MockComponent({ label }) {
      return <div>Mock {label}</div>;
    }
    MockComponent.propTypes = { label: PropTypes.string };
    const Mock = withCheckExtraProps(MockComponent);

    const { container, getByText } = render(<Mock label="test" somethingUnspecified="test" />);

    expect(getByText('Mock test')).toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Component MockComponent has unspecified props: somethingUnspecified');
    expect(container).toMatchSnapshot();
  });

  test('should work with class components', () => {
    class MockComponent extends React.Component {
      render() {
        return <div>Mock {this.props.label}</div>;
      }
    }
    MockComponent.propTypes = { label: PropTypes.string };
    const Mock = withCheckExtraProps(MockComponent);

    const { container, getByText } = render(<Mock label="test" somethingElse="test" />);

    expect(getByText('Mock test')).toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Component MockComponent has unspecified props: somethingElse');
    expect(container).toMatchSnapshot();
  });

  test('should work with forwardRef components', () => {
    const MockComponent = React.forwardRef(({ label }, ref) => {
      return <div ref={ref}>Mock {label}</div>;
    });
    MockComponent.displayName = 'MockComponent';
    MockComponent.propTypes = { label: PropTypes.string };
    const Mock = withCheckExtraProps(MockComponent);

    const { container, getByText } = render(<Mock label="test" test="test" />);

    expect(getByText('Mock test')).toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Component MockComponent has unspecified props: test');
    expect(container).toMatchSnapshot();
  });

  test('should ignore some props', () => {
    function MockComponent({ label }) {
      return <div>Mock {label}</div>;
    }
    MockComponent.propTypes = { label: PropTypes.string };
    const Mock = withCheckExtraProps(MockComponent);

    const { container, getByText } = render(
      <Mock
        label="test"
        staticContext={{}}
        routeParams={{}}
        children={{}}
        location={{}}
        history={{}}
        context={{}}
        params={{}}
        routes={{}}
        route={{}}
        match={{}}
        slug={{}}
        fn={{}}
      />
    );

    expect(getByText('Mock test')).toBeInTheDocument();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('should ignore user-defined props', () => {
    function MockComponent({ label }) {
      return <div>Mock {label}</div>;
    }
    MockComponent.propTypes = { label: PropTypes.string };
    const Mock = withCheckExtraProps(MockComponent, ['data', 'ql']);

    const { container, getByText } = render(<Mock label="test" data={{}} ql={{}} />);

    expect(getByText('Mock test')).toBeInTheDocument();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test('should complain about missing displayName', () => {
    const MockComponent = React.memo(({ label }) => {
      return <div>Mock</div>;
    });
    const Mock = withCheckExtraProps(MockComponent);

    const { container, getByText } = render(<Mock />);

    expect(getByText('Mock')).toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      `Missing 'displayName'. Make sure to add a displayName to all forwardRef, memo, and HOC wrapped components. See: https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging`
    );
    expect(container).toMatchSnapshot();
  });
});
