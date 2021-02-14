import React, { Component } from 'react';
import ProductListing from './product-listing';

class IndexView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortedList: props.productBank,
			sortedDesc: false
		}
	}

	componentDidMount = () => {
		this.handleFilter()
	}
	
	componentWillReceiveProps = () => {
		this.handleFilter()
	}
	  
	handleFilter = (sortOrder = false) => {
		const filterData = this.state.sortedList.sort((a, b) => {
			var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
				if (nameA < nameB) //sort string ascending
					return -1 
				if (nameA > nameB)
					return 1
				return 0 //default return value (no sorting)
		});
		if(!sortOrder){
			this.setState({
				sortedList: filterData.reverse(),
				sortedDesc: false
			});
		} else {
			this.setState({
				sortedList: this.state.sortedDesc ?  filterData.reverse() : filterData,
				sortedDesc: !this.state.sortedDesc
			});
		}
	}

	render() {
		// var localStorageTest = [{ key: "1", name: 'Lala' }];
		if (this.props.productBank === '') {
			return <div>Loading...</div>
		} else {
			return (
				<div className="IndexView">
					<ul id="IndexViewList">
					<li className="product-listing-Heading">
						<div className="filter" onClick={() => this.handleFilter(true)}>Product Name
						{this.state.sortedDesc ? <span>&darr;</span> : <span>&uarr;</span>}							
						</div>
						<div>Price</div>
						<div>Offer Price</div>
						<div/>
					</li>
						{this.props.productBank.map((item) =>
							// <li>{item.name}</li>
							<ProductListing
								modifyProduct={this.props.modifyProduct}
								deleteProduct={this.props.deleteProduct}
								key={item.name}
								name={item.name}
								offerPrice={item.offerPrice}
								price={item.price}
								description={item.description}/>
						)}
					</ul>
				</div>
			)
		}

	}
}

export default IndexView;
