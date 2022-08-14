import { Component } from "react";
import { useParams } from "react-router-dom";
import DetailPage from "./DetailPage";

export function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class SingleItem extends Component {
  render() {
    let { id } = this.props.params;
    return (
      <DetailPage id={id}/>
    );
  }
}
export default withParams(SingleItem);
