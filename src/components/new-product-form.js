import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class NewProductForm extends Component {
	constructor() {
		super();
		this.state = {
			inputText: '',
			textareaText: '',
			originalName: '',
			offerPrice:'',
			price:'',
			description:'',
		}

		this.productToEdit = null;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.isExistingProduct = this.isExistingProduct.bind(this);
	}

	closeNewProductForm() {
		ReactDOM.unmountComponentAtNode(document.getElementById('new-container'));
	}

	componentWillMount() {
		this.setState({
			originalName: this.props.name
		});
		// if (this.props.productInfo) {
			this.setState({
				inputText: this.props.name,
				offerPrice: this.props.offerPrice,
				price: this.props.price,
				description: this.props.description,
			});

			this.productToEdit = {
				name: this.props.name,
				offerPrice: this.props.offerPrice,
				price: this.props.price,
				description: this.props.description
			}
	}

	handleSubmit(event) {
		event.preventDefault(); // making sure it doesn't submit right away
		// Change local storage to the file that was submitted.
		var newProductDetails = {
			title: this.state.inputText.trim() ? this.state.inputText : 'Untitled',
			offerPrice: this.state.offerPrice,
			price: this.state.price,
			description: this.state.description
		};
		// use a callback function?
		if (this.props.editProduct) {
			this.props.modifyProduct(newProductDetails, this.state.originalName); // have to give it its original name
		} else {
			this.props.addProduct(newProductDetails);
		}

		//add a check - if there is no title or no ingredients, don't add them to the table.
		// add submission on Enter?
		this.closeNewProductForm();
	}

	isExistingProduct() {
		return this.productToEdit;
	}

	render() {
		return (
			<form className="new-product-form" onSubmit={this.handleSubmit}>
				<div className="new-product-header">
					<p className="m-font">Add a Product</p>
					<p className="close-icon" onClick={this.closeNewProductForm}>&#10005;</p>
					{/* <i className="fa fa-times close-form" aria-hidden="true" onClick={this.closeNewProductForm}></i> */}
				</div>
				<hr />
				<div className="new-product-body">
				
					<div>
						<p>Product</p>
						<input type="text"
							placeholder="Product Name"
							value={this.state.inputText }
							onChange={(event) => this.setState({ inputText: event.target.value })}
						/>
					</div>
					
				<div>
					<p>Offer Price</p>
					<input type="Number"
					placeholder="Offer Price"
					value={this.state.offerPrice }
					// value={this.state.inputText || this.isExistingProduct().name}
					onChange={(event) => this.setState({ offerPrice: event.target.value })}
				/>
				</div>
				
				<div>
					<p>Price</p>
					<input type="Number"
					placeholder="Price"
					value={this.state.price }
					// value={this.state.inputText || this.isExistingProduct().name}
					onChange={(event) => this.setState({ price: event.target.value })}
				/>
				</div>
					<div>
						<p>Description</p>
						<textarea
							value={this.state.description }
							rows={10}
							// value={this.state.textareaText || this.isExistingProduct().ingredients }
							onChange={(event) => this.setState({ description: event.target.value })}></textarea>
					</div>
				</div>
					<div className="new-product-footer">
						<button type="submit" className="add-product-button">{this.props.btnText || 'Add a Product'}</button>
						<button className="edit-btn" onClick={this.closeNewProductForm}>Close</button>
					</div>
				</form>
			)
		}
	}

export default NewProductForm;
