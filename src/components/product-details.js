import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewProductForm from './new-product-form';

class ProductDetails extends Component {
	constructor(props) {
		super(props);

		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEdit() {
			// also needs a name
			ReactDOM.render(<NewProductForm
				modifyProduct={this.props.modifyProduct}
				editProduct={true}
				name={this.props.name}
				offerPrice={this.props.offerPrice}
				price={this.props.price}
				btnText='save'
				description={this.props.description} />,
				document.getElementById('new-container'));
	}

	handleDelete(event) {
		var productDetails = {
			title: this.props.name,
		}
		this.props.deleteProduct(productDetails);
	}

	render() {
		return (
			<span className="product-details">
			{this.props.offerPrice ?
				(<span className='row'>
				<span className="left">Offer Price</span>
				<span className="right">{this.props.offerPrice}</span>
			</span>) :
			null
			}							
				{this.props.description ?
					(<span>
						<span className='row'>
						<span className="left">Description</span>
						<span className="description">{this.props.description}</span>
					</span>				
					
				</span>) :
				null
				}
								
				<span className='details-footer'>
					<button className="delete-btn" onClick={this.handleDelete}>Delete</button>
					<button className="edit-btn" onClick={this.handleEdit}>Edit</button>
				</span>
			</span>
		)
	}
}

export default ProductDetails;
