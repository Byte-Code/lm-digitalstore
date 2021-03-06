import { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import templates from './DynamicTemplates';

export default class Home extends Component {
  static propTypes = {
    requestFetchWorld: PropTypes.func.isRequired,
    world: ImmutablePropTypes.map
  };

  static defaultProps = {
    world: Map()
  };

  componentDidMount() {
    this.props.requestFetchWorld();
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.world.equals(nextProps.world);
  }

  render() {
    const { world } = this.props;
    const templateProps = { world };
    const template = world.get('worldTemplateName');
    const templateFunction = template ? templates[template] : null;
    return templateFunction ? templateFunction(templateProps) : null;
  }
}

