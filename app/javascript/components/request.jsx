import React from 'react'





class Request extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      feedback: '',
      name: 'Supply team',
      email: 'kenneththesheep@gmail.com',
      requestedItems: [ 'test', '123' ]
    };
    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );


  }


  handleChange( event ) {
    this.setState( {
      feedback: event.target.value
    } )
  }

  sendFeedback( templateId, variables ) {
    window.emailjs.send(
      'gmail', templateId,
      variables
    ).then( res => {
      console.log( 'Email successfully sent!' )
    } )
      // Handle errors here however you like, or use a React error boundary
      .catch( err => console.error( 'Oh well, you failed. Here some thoughts on the error that occured:', err ) )
  }

  handleSubmit( event ) {
    const templateId = 'template_7OTmXOqu';

    this.sendFeedback( templateId, {
      message_html: this.props.requestArray,
      from_name: this.state.name,
      reply_to: this.state.email
    } )
    this.props.reset( 'true' );
  }

  removeRequestItem( event ) {
    console.log( event.target.id );
    this.props.callBackFromDeleteRequestItem( event.target.id );
  }
  render() {

    const products = this.props.requestArray.map( (product, index) => {
      console.log( product );
      return (
      <React.Fragment key={ index }>
        <div className="row">
          <div className="col-6 ">
            <p className="sampletext bodyTitle">

              { product }
            </p>
          </div>
          <div className="col-4">
            <button id={ index }
                    ref="inputBox"
                    onClick={ (event) => {
                                this.removeRequestItem( event )
                              } }>
              Remove
            </button>
          </div>
        </div>
      </React.Fragment>
      );
    } );
    // console.log(inventories)
    return (
    <div>
      <div className="row">
        <div className="col-8">
          { products }
        </div>
        <div className="col-2">
          <form className="test-mailing">
            <input type="button"
                   value="Submit Request"
                   className="btn btn-secondary"
                   onClick={ this.handleSubmit } />
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Request