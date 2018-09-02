
import React ,{Component} from 'react';

class PostItem extends Component {

    constructor(props){
        super(props);

    }
    render(){

        console.log(this.props);

        return(
            <div>
              <h1> Post Item no: {this.props.match.params.postId}</h1>

            </div>
        )
    }
}


export default PostItem
