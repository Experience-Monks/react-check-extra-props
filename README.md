# react-check-extra-props

React runtime library to detect extra properties passed to components.

## Description

This library will alert you about the properties we are passing to the components that we are not expecting. In case those extra properties are because deprecated code, removing them will give a bit of boost and cleanness to your React components.

## Installation

```
npm install react-check-extra-props
```

## Importing

```
import checkProps from '../../util/react-check-extra-props';
```

## Usage

Wrap your propTypes object with the checking function and it will flag in the console all the extra properties we are sending to this object.

```
import React from 'react';
import PropTypes from 'prop-types';

import checkProps from '../../util/react-check-extra-props';

class ExampleComponent extends React.Component {
  render() {
    // render function code
  }
}

ExampleComponent.propTypes = checkProps({
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool
});

ExampleComponent.defaultProps = {
  isOpen: false
};

export default ExampleComponent;
```

### Ignoring

In case you don't want to define in propTypes all the properties and you don't want the library to flag them as extra properties you can ignore them. To ignore them, send a second argument to the function. This argument is an array with property names.

```
...
const propsToIgnore = ['ref', 'data', 'ql'];

ExampleComponent.propTypes = checkProps({
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool
}, propsToIgnore);
...
```
