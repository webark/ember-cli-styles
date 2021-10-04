import Component from '@glimmer/component';

export default class extends Component {
  items = [...Array(10).keys()];
}
