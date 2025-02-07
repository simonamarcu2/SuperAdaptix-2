// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import './Toolbar.css';

// export default class Toolbar extends Component {
//     handleZoomChange = (e) => {
//         if (this.props.onZoomChange) {
//             this.props.onZoomChange(e.target.value);
//         }
        
//         Toolbar.propTypes = {
//             onZoomChange: PropTypes.func,
//             zoom: PropTypes.string.isRequired
//         };
//         }
    
//     render() {
//         const zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
//             const isActive = this.props.zoom === value;
//             return (
//                 <label key={ value } className={ `radio-label ${isActive ? 'radio-label-active': ''}` }>
//                     <input type='radio'
//                         checked={ isActive }
//                         onChange={ this.handleZoomChange }
//                         value={ value }/>
//                     { value }
//                 </label>
//             );
//         });

//         return (
//             <div className="tool-bar">
//                 <b>Zooming: </b>
//                     { zoomRadios }
//             </div>
//         );
//     }
// }
