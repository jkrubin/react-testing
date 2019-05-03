import React from "react"
import './index.css'
class Carousel extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			index: 0,
			trans: 0,
		}
		this.nextSlide = this.nextSlide.bind(this)
		this.prevSlide = this.prevSlide.bind(this)
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
			
	}
	componentDidMount(){
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	nextSlide(){
		this.setState((prevState) => {
			if(prevState.index === this.props.slides.length - 1 ){
				return({index:0, trans:0})
			}else{
				return({index: prevState.index + 1, trans: prevState.trans - this.slideWidth()})
			}
		})
	}
	prevSlide(){
		this.setState((prevState) => {
			if(prevState.index === 0 ){
				return({index:this.props.slides.length - 1, trans: -(this.slideWidth() * (this.props.slides.length - 1))})
			}else{
				return({index: prevState.index - 1, trans: prevState.trans + this.slideWidth()})
			}
		})
	}
	updateWindowDimensions(){
		this.setState({trans: -(this.slideWidth() * (this.state.index - 1)) })
	}
	slideWidth = () => {
		return document.querySelector('.slide').clientWidth
	}
	render(){
	  	const slides = this.props.slides.map((slide, index) => {
	  		return(
	  			<div key={index} className="slide">
	  				{slide}
	  			</div>
	  		)
	  	})

		return(
			<div className="carousel-container">
				<div className="carousel">
					<div className="slide-wrapper" style={{
			            transform: `translateX(${this.state.trans}px)`,
			            transition: 'transform ease-out 0.5s'
	         		}}>
	         		
	         		{slides}
					
					</div>
					<div className="arrow prev-arrow" onClick={this.prevSlide}>
						<img src={require("../../assets/arrow.png")} alt="" />
					</div>
					<div className="arrow next-arrow" onClick={this.nextSlide}>
						<img src={require("../../assets/arrow.png")} alt="" />
					</div>
					
				</div>
			</div>
		)
	}
}

export default Carousel